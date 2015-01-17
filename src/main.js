/*! Typograf | © 2014 Denis Seleznev | https://github.com/typograf/typograf/ */

/**
 * @constructor
 * @param {Object} [prefs]
 * @param {string} [prefs.lang] Language rules
 * @param {string} [prefs.mode] HTML entities as: 'default' - UTF-8, 'digit' - &#160;, 'name' - &nbsp;
 */
function Typograf(prefs) {
    this._prefs = typeof prefs === 'object' ? prefs : {};

    this._settings = {};
    this._enabledRules = {};

    this._initSafeTags();
    this._rules.forEach(this._prepareRule, this);
}

/**
 * Add a rule.
 *
 * @static
 * @param {Object} rule
 * @param {string} rule.name Name of rule
 * @param {Function} rule.func Processing function
 * @param {string} [rule.sortIndex] Sorting index for rule
 * @param {boolean} [rule.enabled] Rule is enabled by default
 * @return {Typograf} this
 */
Typograf.rule = function(rule) {
    rule.enabled = rule.enabled === false ? false : true;
    rule._lang = rule.name.split('/')[0];
    rule.sortIndex = rule.sortIndex || /* istanbul ignore next */ 0;

    Typograf.prototype._rules.push(rule);

    if(Typograf._needSortRules) {
        this._sortRules();
    }

    return this;
};

/**
 * Add internal rule.
 * Internal rules are executed before main.
 *
 * @static
 * @param {Object} rule
 * @param {string} rule.name Name of rule
 * @param {Function} rule.func Processing function
 * @param {string} [rule.sortIndex] Sorting index for rule
 * @return {Typograf} this
 */
Typograf.innerRule = function(rule) {
    Typograf.prototype._innerRules.push(rule);

    rule._lang = rule.name.split('/')[0];
    rule.sortIndex = rule.sortIndex || 0;

    if(Typograf._needSortRules) {
        this._sortInnerRules();
    }

    return this;
};

/**
 * Add data for use in rules.
 *
 * @static
 * @param {string} key
 * @param {*} value
 */
Typograf.data = function(key, value) {
    Typograf.prototype._data[key] = value;
};

Typograf._sortRules = function() {
    Typograf.prototype._rules.sort(function(a, b) {
        return a.sortIndex > b.sortIndex ? 1 : -1;
    });
};

Typograf._sortInnerRules = function() {
    Typograf.prototype._innerRules.sort(function(a, b) {
        return a.sortIndex > b.sortIndex ? 1 : -1;
    });
};

Typograf.prototype = {
    constructor: Typograf,
    /**
     * Execute typographical rules for text.
     *
     * @param {string} text
     * @param {Object} [prefs]
     * @param {string} [prefs.lang] Language rules
     * @param {string} [prefs.mode] Type HTML entities
     * @return {string}
     */
    execute: function(text, prefs) {
        prefs = prefs || {};

        var that = this,
            lang = prefs.lang || this._prefs.lang || 'common',
            rulesForQueue = {},
            innerRulesForQueue = {},
            mode = typeof prefs.mode === 'undefined' ? this._prefs.mode : prefs.mode,
            iterator = function(rule) {
                var rlang = rule._lang;

                if((rlang === 'common' || rlang === lang) && this.enabled(rule.name)) {
                    text = rule.func.call(this, text, this._settings[rule.name]);
                }
            },
            executeRulesForQueue = function(queue) {
                innerRulesForQueue[queue] && innerRulesForQueue[queue].forEach(iterator, that);
                rulesForQueue[queue] && rulesForQueue[queue].forEach(iterator, that);
            };
        
        this._lang = lang;

        text = '' + text;

        if(!text) {
            return '';
        }

        text = this._fixLineEnd(text);

        this._innerRules.forEach(function(rule) {
            var q = rule.queue;
            innerRulesForQueue[q] = innerRulesForQueue[q] || [];
            innerRulesForQueue[q].push(rule);
        }, this);

        this._rules.forEach(function(rule) {
            var q = rule.queue;
            rulesForQueue[q] = rulesForQueue[q] || [];
            rulesForQueue[q].push(rule);
        }, this);

        executeRulesForQueue('start');

        var isHTML = text.search(/<[a-z!]/i) !== -1;
        if(isHTML) {
            text = this._hideSafeTags(text);
        }

        text = this._utfication(text);
        executeRulesForQueue();
        text = this._modification(text, mode);

        if(isHTML) {
            text = this._showSafeTags(text);
        }

        executeRulesForQueue('end');

        this._lang = null;

        return text;
    },
    /**
     * Get/set a setting
     *
     * @param {string} ruleName
     * @param {string} setting
     * @param {*} [value]
     * @return {*}
     */
    setting: function(ruleName, setting, value) {
        if(arguments.length <= 2) {
            return this._settings[ruleName] && this._settings[ruleName][setting];
        } else {
            this._settings[ruleName] = this._settings[ruleName] || {};
            this._settings[ruleName][setting] = value;

            return this;
        }
    },
    /**
     * Is enabled a rule.
     *
     * @param {string} ruleName
     * @return {boolean}
     */
    enabled: function(ruleName) {
        return this._enabledRules[ruleName];
    },
    /**
     * Is disabled a rule.
     *
     * @param {string} ruleName
     * @return {boolean}
     */
    disabled: function(ruleName) {
        return !this._enabledRules[ruleName];
    },
    /**
     * Enable a rule.
     *
     * @param {string} ruleName
     * @return {boolean}
     */
    enable: function(ruleName) {
        return this._enable(ruleName, true);
    },
    /**
     * Disable a rule.
     *
     * @param {string|Array[string]} ruleName
     * @return {boolean}
     */
    disable: function(ruleName) {
        return this._enable(ruleName, false);
    },
    /**
     * Add safe tag.
     *
     * @param {string} startTag
     * @param {string} endTag
     */
    addSafeTag: function(startTag, endTag) {
        this._safeTags.push([startTag, endTag]);
    },
    /**
     * Get a string of characters with range for current language.
     * This is used in regular expressions in rules.
     *
     * @return {string}
     */    
    letters: function() {
        var lang = this._lang || this._prefs.lang,
            commonLetter = this.data('common/letter'),
            langLetter = this.data(lang + '/letter');
        
        return commonLetter === langLetter || !lang ? commonLetter : commonLetter + langLetter;
    },
    /**
     * Get data for use in rules.
     * This is used in regular expressions in rules.
     *
     * @param {string} key
     * @return {*}
     */    
    data: function(key) {
        return this._data[key];
    },
    _data: {},
    _fixLineEnd: function(text) {
        return text
            .replace(/\r\n/g, '\n') // Windows
            .replace(/\r/g, '\n'); // MacOS
    },
    _prepareRule: function(rule) {
        var name = rule.name;
        this._settings[name] = rule.settings || {};
        this._enabledRules[name] = rule.enabled;
    },
    _enable: function(rule, enabled) {
        if(Array.isArray(rule)) {
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
        if(rule.search(/\*/) !== -1) {
            re = new RegExp(rule
                .replace(/\//g, '\\\/')
                .replace(/\*/g, '.*'));

            this._rules.forEach(function(el) {
                var name = el.name;
                if(re.test(name)) {
                    this._enabledRules[name] = enabled;
                }
            }, this);
        } else {
            this._enabledRules[rule] = enabled;
        }
    },
    _rules: [],
    _innerRules: [],
    _initSafeTags: function() {
        this._safeTags = [
            ['<!--', '-->'],
            ['<!ENTITY', '>'],
            ['<!DOCTYPE', '>'],
            ['<\\?xml', '\\?>'],
            ['<!\\[CDATA\\[', '\\]\\]>']
        ];

        [
            'code',
            'kbd',
            'object',
            'pre',
            'samp',
            'script',
            'style',
            'var'
        ].forEach(function(tag) {
            this._safeTags.push(['<' + tag + '(\\s[^>]*?)?>', '</' + tag + '>']);
        }, this);
    },
    _hideSafeTags: function(text) {
        this._hiddenSafeTags = {};

        var that = this,
            i = 0,
            pasteTag = function(match) {
                var key = '\uDBFFtypograf' + i + '\uDBFF';
                that._hiddenSafeTags[key] = match;
                i++;

                return key;
            };

        this._safeTags.forEach(function(tag) {
            var re = new RegExp(tag[0] + '[^]*?' + tag[1], 'gi');
            text = text.replace(re, pasteTag);
        });

        return text.replace(/<[a-z\/][^>]*?>/gi, pasteTag);
    },
    _showSafeTags: function(text) {
        var replace = function(key) {
            text = text.replace(new RegExp(key, 'gi'), this._hiddenSafeTags[key]);
        };

        for(var i = 0; i < this._safeTags.length; i++) {
            Object.keys(this._hiddenSafeTags).forEach(replace, this);

            if(text.search(/\uDBFFtypograf[\d]+\uDBFF/) < 0) {
                break;
            }
        }

        delete this._hiddenSafeTags;

        return text;
    },
    _utfication: function(text) {
        if(text.search(/&#/) !== -1) {
            text = this._decHexToUtf(text);
        }
        
        if(text.search(/&[a-z]/i) !== -1) {
            this.entities.forEach(function(entity) {
                text = text.replace(entity[3], entity[2]);
            });
        }

        return text;
    },
    _decHexToUtf: function(text) {
        return text
            .replace(/&#(\d{1,6});/gi, function($0, $1) {
                return String.fromCharCode(parseInt($1, 10));
            })
            .replace(/&#x([\da-f]{1,6});/gi, function($0, $1) {
                return String.fromCharCode(parseInt($1, 16));
            });
    },
    _modification: function(text, mode) {
        if(mode === 'name' || mode === 'digit') {
            var index = mode === 'name' ? 0 : 1;
            this.entities.forEach(function(entity) {
                if(entity[index]) {
                    text = text.replace(entity[4], entity[index]);
                }
            });
        }

        return text;
    }
};

/* istanbul ignore else  */
if(typeof exports === 'object') {
    module.exports = Typograf;
}
