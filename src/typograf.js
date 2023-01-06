import groupIndexes from './groupIndexes';
import HtmlEntities from './htmlEntities/index';
import { addLocale, hasLocale, getLocales, prepareLocale } from './locale';
import { getData, setData } from './data';
import SafeTags from './safeTags';

import { replaceNbsp, isHTML, removeCR, fixLineEnding } from './helpers/string';
import { deepCopy } from './helpers/object';
import { privateSeparateLabel } from './consts';

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
export default class Typograf {
    constructor(prefs) {
        this._prefs = typeof prefs === 'object' ? prefs : {};
        this._prefs.locale = prepareLocale(this._prefs.locale);
        this._prefs.live = this._prefs.live || false;

        this._safeTags = new SafeTags();

        this._settings = {};
        this._enabledRules = {};

        this._innerRulesByQueues = {};
        this._innerRules = [].concat(this._innerRules);
        this._innerRules.forEach(function(rule) {
            const q = rule.queue || 'default';
            this._innerRulesByQueues[q] = this._innerRulesByQueues[q] || [];
            this._innerRulesByQueues[q].push(rule);
        }, this);

        this._rulesByQueues = {};
        this._rules = [].concat(this._rules);
        this._rules.forEach(function(rule) {
            const q = rule.queue || 'default';
            this._prepareRule(rule);
            this._rulesByQueues[q] = this._rulesByQueues[q] || [];
            this._rulesByQueues[q].push(rule);
        }, this);

        this._prefs.disableRule && this.disableRule(this._prefs.disableRule);
        this._prefs.enableRule && this.enableRule(this._prefs.enableRule);

        this._separatePartsTags = [
            'title',
            'p',
            'h[1-6]',
            'select',
            'legend'
        ];
    }

    /**
     * Add a rule.
     *
     * @static
     * @param {TypografRule} rule
     *
     * @returns {Typograf} this
     */
    static addRule(rule) {
        const parts = rule.name.split('/');
        const locale = parts[0];
        const group = parts[1];
        const name = parts[2];

        rule._enabled = rule.disabled === true ? false : true;
        rule._locale = locale;
        rule._group = group;
        rule._name = name;

        this.addLocale(rule._locale);

        this._setIndex(rule);

        this.prototype._rules.push(rule);

        this._sortRules(this.prototype._rules);

        return this;
    }

    /**
     * Add rules.
     *
     * @static
     * @param {TypografRule[]} rules
     *
     * @returns {Typograf} this
     */
    static addRules(rules) {
        rules.forEach((item) => {
            this.addRule(item);
        });

        return this;
    }

    /**
     * Add internal rule.
     * Internal rules are executed before main.
     *
     * @static
     * @param {TypografRule} rule
     *
     * @returns {Typograf} this
     */
    static addInnerRule(rule) {
        this.prototype._innerRules.push(rule);

        rule._locale = rule.name.split('/')[0];

        return this;
    }

    /**
     * Add internal rules.
     * Internal rules are executed before main.
     *
     * @static
     * @param {TypografRule[]} rules
     *
     * @returns {Typograf} this
     */
    static addInnerRules(rules) {
        rules.forEach((item) => {
            this.addInnerRule(item);
        });

        return this;
    }

    static _setIndex(rule) {
        let index = rule.index;
        const t = typeof index;
        const groupIndex = groupIndexes[rule._group];

        if (t === 'undefined') {
            index = groupIndex;
        } else if (t === 'string') {
            index = (groupIndex || 0) + parseInt(rule.index, 10);
        }

        rule._index = index;
    }

    static _sortRules(rules) {
        rules.sort(function(a, b) {
            return a._index > b._index ? 1 : -1;
        });
    }

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
    execute(text, prefs) {
        text = '' + text;

        if (!text) { return ''; }

        const context = this._prepareContext(text);

        this._preparePrefs(context, prefs);

        return this._process(context);
    }

    _prepareContext(text) {
        return {
            text,
            isHTML: isHTML(text),
            prefs: deepCopy(this._prefs),
            getData: function(key) {
                if (key === 'char') {
                    return this.prefs.locale.map(function(item) {
                        return getData(item + '/' + key);
                    }).join('');
                } else {
                    return getData(this.prefs.locale[0] + '/' + key);
                }
            }
        };
    }

    _preparePrefs(context, prefs) {
        prefs = prefs || {};

        const contextPrefs = context.prefs;

        for (const name of [
            'htmlEntity',
            'lineEnding',
            'processingSeparateParts',
            'ruleFilter'
        ]) {
            if (name in prefs) {
                contextPrefs[name] = prefs[name];
            } else if (name in this._prefs) {
                contextPrefs[name] = this._prefs[name];
            }
        }

        contextPrefs.htmlEntity = contextPrefs.htmlEntity || {};

        contextPrefs.locale = prepareLocale(prefs.locale, this._prefs.locale);

        const locale = contextPrefs.locale;
        const locale0 = locale[0];

        if (!locale.length || !locale0) {
            throw Error('Not defined the property "locale".');
        }

        if (!hasLocale(locale0)) {
            throw Error('"' + locale0 + '" is not supported locale.');
        }
    }

    _splitBySeparateParts(context) {
        if (!context.isHTML || context.prefs.processingSeparateParts === false) {
            return [ context.text ];
        }

        const
            text = [],
            reTags = new RegExp('<(' + this._separatePartsTags.join('|') + ')(\\s[^>]*?)?>[^]*?</\\1>', 'gi');

        let position = 0;

        context.text.replace(reTags, function($0, $1, $2, itemPosition) {
            if (position !== itemPosition) {
                text.push(
                    (position ? privateSeparateLabel : '') +
                    context.text.slice(position, itemPosition) +
                    privateSeparateLabel
                );
            }

            text.push($0);

            position = itemPosition + $0.length;

            return $0;
        });

        text.push(
            position ?
                (privateSeparateLabel + context.text.slice(position, context.text.length)) :
                context.text
        );

        return text;
    }

    _process(context) {
        context.text = removeCR(context.text);

        this._executeRules(context, 'start');

        this._safeTags.hide(context, 'own');
        this._executeRules(context, 'hide-safe-tags-own');

        this._safeTags.hide(context, 'html');
        this._executeRules(context, 'hide-safe-tags-html');

        const
            isRootHTML = context.isHTML,
            re = new RegExp(privateSeparateLabel, 'g');

        context.text = this._splitBySeparateParts(context).map((item) => {
            context.text = item;
            context.isHTML = isHTML(item);
            this._safeTags.hideHTMLTags(context);

            this._safeTags.hide(context, 'url');
            this._executeRules(context, 'hide-safe-tags-url');

            this._executeRules(context, 'hide-safe-tags');

            HtmlEntities.toUtf(context);

            if (this._prefs.live) {
                context.text = replaceNbsp(context.text);
            }

            this._executeRules(context, 'utf');

            this._executeRules(context);

            HtmlEntities.restore(context);

            this._executeRules(context, 'html-entities');

            this._safeTags.show(context, 'url');
            this._executeRules(context, 'show-safe-tags-url');

            return context.text.replace(re, '');
        }).join('');

        context.isHTML = isRootHTML;

        this._safeTags.show(context, 'html');
        this._executeRules(context, 'show-safe-tags-html');

        this._safeTags.show(context, 'own');
        this._executeRules(context, 'show-safe-tags-own');

        this._executeRules(context, 'end');

        return fixLineEnding(context.text, context.prefs.lineEnding);
    }

    /**
     * Get a setting.
     *
     * @param {string} ruleName
     * @param {string} setting
     *
     * @returns {*}
     */
    getSetting(ruleName, setting) {
        return this._settings[ruleName] && this._settings[ruleName][setting];
    }

    /**
     * Set a setting.
     *
     * @param {string} ruleName
     * @param {string} setting
     * @param {*} [value]
     *
     * @returns {Typograf}
     */
    setSetting(ruleName, setting, value) {
        this._settings[ruleName] = this._settings[ruleName] || {};
        this._settings[ruleName][setting] = value;

        return this;
    }

    /**
     * Is enabled a rule.
     *
     * @param {string} ruleName
     *
     * @returns {boolean}
     */
    isEnabledRule(ruleName) {
        return this._enabledRules[ruleName];
    }

    /**
     * Is disabled a rule.
     *
     * @param {string} ruleName
     *
     * @returns {boolean}
     */
    isDisabledRule(ruleName) {
        return !this._enabledRules[ruleName];
    }

    /**
     * Enable a rule.
     *
     * @param {string|string[]} ruleName
     *
     * @returns {Typograf} this
     */
    enableRule(ruleName) {
        return this._enable(ruleName, true);
    }

    /**
     * Disable a rule.
     *
     * @param {string|string[]} ruleName
     *
     * @returns {Typograf} this
     */
    disableRule(ruleName) {
        return this._enable(ruleName, false);
    }

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
    addSafeTag(startTag, endTag, middle) {
        const tag = startTag instanceof RegExp ? startTag : [startTag, endTag, middle];

        this._safeTags.add(tag);

        return this;
    }

    _executeRules(context, queue) {
        queue = queue || 'default';

        const rules = this._rulesByQueues[queue];
        const innerRules = this._innerRulesByQueues[queue];

        innerRules && innerRules.forEach(function(rule) {
            this._ruleIterator(context, rule);
        }, this);

        rules && rules.forEach(function(rule) {
            this._ruleIterator(context, rule);
        }, this);
    }

    _ruleIterator(context, rule) {
        const rlocale = rule._locale;
        const live = this._prefs.live;

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
    }

    _prepareRule(rule) {
        const name = rule.name;
        const t = typeof rule.settings;
        let settings = {};

        if (t === 'object') {
            settings = deepCopy(rule.settings);
        } else if (t === 'function') {
            settings = rule.settings(rule);
        }

        this._settings[name] = settings;
        this._enabledRules[name] = rule._enabled;
    }

    _enable(rule, enabled) {
        if (Array.isArray(rule)) {
            rule.forEach(function(el) {
                this._enableByMask(el, enabled);
            }, this);
        } else {
            this._enableByMask(rule, enabled);
        }

        return this;
    }

    _enableByMask(rule, enabled) {
        if (!rule) { return; }

        if (rule.search(/\*/) !== -1) {
            const re = new RegExp(rule
                .replace(/\//g, '\\/')
                .replace(/\*/g, '.*'));

            this._rules.forEach(function(el) {
                const name = el.name;
                if (re.test(name)) {
                    this._enabledRules[name] = enabled;
                }
            }, this);
        } else {
            this._enabledRules[rule] = enabled;
        }
    }

    _getRule(name) {
        let rule = null;
        this._rules.some(function(item) {
            if (item.name === name) {
                rule = item;
                return true;
            }

            return false;
        });

        return rule;
    }
}

Typograf.version = '{{version}}';

Typograf.addLocale = addLocale;
Typograf.getLocales = getLocales;
Typograf.hasLocale = hasLocale;

Typograf.setData = setData;
Typograf.getData = getData;

// @deprecated
Typograf.deepCopy = deepCopy;

Typograf.prototype._rules = [];
Typograf.prototype._innerRules = [];

/**
 * @typedef TypografRule
 * @type {object}
 *
 * @property {string} name Name of rule
 * @property {Function} handler Processing function
 * @property {number} [index] Sorting index for rule
 * @property {boolean} [disabled] Rule is disabled by default
 * @property {boolean} [live] Live mode
 * @property {Object} [settings] Settings for rule
 */
