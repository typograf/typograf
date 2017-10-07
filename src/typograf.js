import blockElements from './block-elements';
import inlineElements from './inline-elements';
import groupIndexes from './group-indexes';
import HtmlEntities from './html-entities';
import SafeTags from './safe-tags';

/**
 * @constructor
 * @param {Object} [prefs]
 * @param {string} [prefs.locale] Locale
 * @param {string} [prefs.lineEnding] Line ending. 'LF' (Unix), 'CR' (Mac) or 'CRLF' (Windows). Default: 'LF'.
 * @param {HtmlEntity} [prefs.htmlEntity]
 * @param {boolean} [prefs.live] Live mode
 * @param {string|string[]} [prefs.enableRule] Enable a rule
 * @param {string|string[]} [prefs.disableRule] Disable a rule
 */
export default function Typograf(prefs) {
    this._prefs = typeof prefs === 'object' ? prefs : {};
    this._prefs.locale = Typograf._prepareLocale(this._prefs.locale);
    this._prefs.live = this._prefs.live || false;

    this._safeTags = new SafeTags();

    this._settings = {};
    this._enabledRules = {};

    this._innerRulesByQueues = {};
    this._innerRules = [].concat(this._innerRules);
    this._innerRules.forEach(function(rule) {
        var q = rule.queue || 'default';
        this._innerRulesByQueues[q] = this._innerRulesByQueues[q] || [];
        this._innerRulesByQueues[q].push(rule);
    }, this);

    this._rulesByQueues = {};
    this._rules = [].concat(this._rules);
    this._rules.forEach(function(rule) {
        var q = rule.queue || 'default';
        this._prepareRule(rule);
        this._rulesByQueues[q] = this._rulesByQueues[q] || [];
        this._rulesByQueues[q].push(rule);
    }, this);

    this._prefs.disableRule && this.disableRule(this._prefs.disableRule);
    this._prefs.enableRule && this.enableRule(this._prefs.enableRule);
}

Typograf._mix = function(dest, props) {
    Object.keys(props).forEach(function(key) {
        dest[key] = props[key];
    });
};

Typograf._mix(Typograf, {
    version: '{{version}}',
    /**
     * Add a rule.
     *
     * @static
     * @param {Object} rule
     * @param {string} rule.name Name of rule
     * @param {Function} rule.handler Processing function
     * @param {number} [rule.index] Sorting index for rule
     * @param {boolean} [rule.disabled] Rule is disabled by default
     * @param {boolean} [rule.live] Live mode
     * @param {Object} [rule.settings] Settings for rule
     *
     * @returns {Typograf} this
     */
    addRule: function(rule) {
        var parts = rule.name.split('/');

        rule._enabled = rule.disabled === true ? false : true;
        rule._locale = parts[0];
        rule._group = parts[1];
        rule._name = parts[2];

        this.addLocale(rule._locale);

        this._setIndex(rule);

        this.prototype._rules.push(rule);

        this._sortRules(this.prototype._rules);

        return this;
    },
    /**
     * Add internal rule.
     * Internal rules are executed before main.
     *
     * @static
     * @param {Object} rule
     * @param {string} rule.name Name of rule
     * @param {Function} rule.handler Processing function
     *
     * @returns {Typograf} this
     */
    addInnerRule: function(rule) {
        this.prototype._innerRules.push(rule);

        rule._locale = rule.name.split('/')[0];

        return this;
    },
    /**
     * Get a deep copy of a object.
     *
     * @param {*} obj
     *
     * @returns {*}
     */
    deepCopy: function(obj) {
        return typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj;
    },
    inlineElements: inlineElements,
    blockElements: blockElements,
    groupIndexes: groupIndexes,
    HtmlEntities: HtmlEntities,   
    _privateLabel: '\uDBFF',
    _repeat: function(symbol, count) {
        var result = '';
        for (;;) {
            if ((count & 1) === 1) {
                result += symbol;
            }
            count >>>= 1;
            if (count === 0) {
                break;
            }
            symbol += symbol;
        }

        return result;
    },
    _replace: function(text, re) {
        for (var i = 0; i < re.length; i++) {
            text = text.replace(re[i][0], re[i][1]);
        }

        return text;
    },
    _replaceNbsp: function(text) {
        return text.replace(/\u00A0/g, ' ');
    },
    _setIndex: function(rule) {
        var index = rule.index,
            t = typeof index,
            groupIndex = this.groupIndexes[rule._group];

        if (t === 'undefined') {
            index = groupIndex;
        } else if (t === 'string') {
            index = groupIndex + parseInt(rule.index, 10);
        }

        rule._index = index;
    },
    _reUrl: new RegExp('(https?|file|ftp)://([a-zA-Z0-9/+-=%&:_.~?]+[a-zA-Z0-9#+]*)', 'g'),
    _sortRules: function(rules) {
        rules.sort(function(a, b) {
            return a._index > b._index ? 1 : -1;
        });
    }
});

Typograf.prototype = {
    constructor: Typograf,
    /**
     * Execute typographical rules for text.
     *
     * @param {string} text
     * @param {Object} [prefs]
     * @param {string} [prefs.locale] Locale
     * @param {HtmlEntity} [prefs.htmlEntity] Type of HTML entities
     * @param {string} [prefs.lineEnding] Line ending. 'LF' (Unix), 'CR' (Mac) or 'CRLF' (Windows). Default: 'LF'.
     *
     * @returns {string}
     */
    execute: function(text, prefs) {
        var that = this;

        text = '' + text;

        if (!text) { return ''; }

        prefs = prefs || {};

        var context = {
            text: text,
            prefs: Typograf.deepCopy(this._prefs),
            getData: function(key) {
                if (key === 'char') {
                    return this.prefs.locale.map(function(item) {
                        return Typograf.getData(item + '/' + key);
                    }).join('');
                } else {
                    return Typograf.getData(this.prefs.locale[0] + '/' + key);
                }
            }
        };

        context.prefs.htmlEntity = prefs.htmlEntity || this._prefs.htmlEntity || {};
        context.prefs.locale = Typograf._prepareLocale(prefs.locale, this._prefs.locale);
        context.prefs.lineEnding = prefs.lineEnding || this._prefs.lineEnding;
        context.prefs.ruleFilter = prefs.ruleFilter || this._prefs.ruleFilter;

        var locale = context.prefs.locale;
        if (!locale.length || !locale[0]) {
            throw Error('Not defined the property "locale".');
        }

        if (!Typograf.hasLocale(locale[0])) {
            throw Error('"' + locale[0] + '" is not supported locale.');
        }

        context.text = this._removeCR(context.text);

        context.isHTML = context.text.search(/(<\/?[a-z]|<!|&[lg]t;)/i) !== -1;

        this._executeRules(context, 'start');

        this._safeTags.hide(context, function(c, group) {
            that._executeRules(c, 'hide-safe-tags-' + group);
        });

        this._executeRules(context, 'hide-safe-tags');

        Typograf.HtmlEntities.toUtf(context);

        if (this._prefs.live) { context.text = Typograf._replaceNbsp(context.text); }

        this._executeRules(context, 'utf');

        this._executeRules(context);

        Typograf.HtmlEntities.restore(context);

        this._executeRules(context, 'html-entities');

        this._safeTags.show(context, function(c, group) {
            that._executeRules(c, 'show-safe-tags-' + group);
        });

        this._executeRules(context, 'end');

        return this._fixLineEnding(context.text, context.prefs.lineEnding);
    },
    /**
     * Get a setting.
     *
     * @param {string} ruleName
     * @param {string} setting
     *
     * @returns {*}
     */
    getSetting: function(ruleName, setting) {
        return this._settings[ruleName] && this._settings[ruleName][setting];
    },
    /**
     * Set a setting.
     *
     * @param {string} ruleName
     * @param {string} setting
     * @param {*} [value]
     *
     * @returns {Typograf}
     */
    setSetting: function(ruleName, setting, value) {
        this._settings[ruleName] = this._settings[ruleName] || {};
        this._settings[ruleName][setting] = value;

        return this;
    },
    /**
     * Is enabled a rule.
     *
     * @param {string} ruleName
     *
     * @returns {boolean}
     */
    isEnabledRule: function(ruleName) {
        return this._enabledRules[ruleName];
    },
    /**
     * Is disabled a rule.
     *
     * @param {string} ruleName
     *
     * @returns {boolean}
     */
    isDisabledRule: function(ruleName) {
        return !this._enabledRules[ruleName];
    },
    /**
     * Enable a rule.
     *
     * @param {string|string[]} ruleName
     *
     * @returns {Typograf} this
     */
    enableRule: function(ruleName) {
        return this._enable(ruleName, true);
    },
    /**
     * Disable a rule.
     *
     * @param {string|string[]} ruleName
     *
     * @returns {Typograf} this
     */
    disableRule: function(ruleName) {
        return this._enable(ruleName, false);
    },
    /**
     * Add safe tag.
     *
     * @example
     * // var t = new Typograf({locale: 'ru'});
     * // t.addSafeTag('<mytag>', '</mytag>');
     * // t.addSafeTag('<mytag>', '</mytag>', '.*?');
     * // t.addSafeTag(/<mytag>.*?</mytag>/gi);
     *
     * @param {string|RegExp} startTag
     * @param {string} [endTag]
     * @param {string} [middle]
     *
     * @returns {Typograf} this
    */
    addSafeTag: function(startTag, endTag, middle) {
        var tag = startTag instanceof RegExp ? startTag : [startTag, endTag, middle];

        this._safeTags.add(tag);

        return this;
    },
    _executeRules: function(context, queue) {
        queue = queue || 'default';

        var rules = this._rulesByQueues[queue],
            innerRules = this._innerRulesByQueues[queue];

        innerRules && innerRules.forEach(function(rule) {
            this._ruleIterator(context, rule);
        }, this);

        rules && rules.forEach(function(rule) {
            this._ruleIterator(context, rule);
        }, this);
    },
    _ruleIterator: function(context, rule) {
        var rlocale = rule._locale,
            live = this._prefs.live;

        if ((live === true && rule.live === false) || (live === false && rule.live === true)) {
            return;
        }

        if ((rlocale === 'common' || rlocale === context.prefs.locale[0]) && this.isEnabledRule(rule.name)) {
            if (context.prefs.ruleFilter && !context.prefs.ruleFilter(rule)) {
                return;
            }

            this._onBeforeRule && this._onBeforeRule(rule.name, context.text, context);
            context.text = rule.handler.call(this, context.text, this._settings[rule.name], context);
            this._onAfterRule && this._onAfterRule(rule.name, context.text, context);
        }
    },
    _removeCR: function(text) {
        return text.replace(/\r\n?/g, '\n');
    },
    _fixLineEnding: function(text, type) {
        if (type === 'CRLF') { // Windows
            return text.replace(/\n/g, '\r\n');
        } else if (type === 'CR') { // Mac
            return text.replace(/\n/g, '\r');
        }

        return text;
    },
    _prepareRule: function(rule) {
        var name = rule.name,
            t = typeof rule.settings,
            settings = {};

        if (t === 'object') {
            settings = Typograf.deepCopy(rule.settings);
        } else if (t === 'function') {
            settings = rule.settings(rule);
        }

        this._settings[name] = settings;
        this._enabledRules[name] = rule._enabled;
    },
    _enable: function(rule, enabled) {
        if (Array.isArray(rule)) {
            rule.forEach(function(el) {
                this._enableByMask(el, enabled);
            }, this);
        } else {
            this._enableByMask(rule, enabled);
        }

        return this;
    },
    _enableByMask: function(rule, enabled) {
        var re;
        if (!rule) { return; }

        if (rule.search(/\*/) !== -1) {
            re = new RegExp(rule
                .replace(/\//g, '\\/')
                .replace(/\*/g, '.*'));

            this._rules.forEach(function(el) {
                var name = el.name;
                if (re.test(name)) {
                    this._enabledRules[name] = enabled;
                }
            }, this);
        } else {
            this._enabledRules[rule] = enabled;
        }
    },
    _rules: [],
    _innerRules: [],
    _getRule: function(name) {
        var rule = null;
        this._rules.some(function(item) {
            if (item.name === name) {
                rule = item;
                return true;
            }

            return false;
        });

        return rule;
    }
};
