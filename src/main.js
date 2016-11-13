/**
 * @constructor
 * @param {Object} [prefs]
 * @param {string} [prefs.lang] Language rules
 * @param {string} [prefs.mode] HTML entities as: 'default' - UTF-8, 'digit' - &#160;, 'name' - &nbsp;
 * @param {string} [prefs.lineEnding] Line ending. 'LF' (Unix), 'CR' (Mac) or 'CRLF' (Windows). Default: 'LF'.
 * @param {boolean} [prefs.live] Live mode
 * @param {string|string[]} [prefs.enable] Enable rules
 * @param {string|string[]} [prefs.disable] Disable rules
 */
function Typograf(prefs) {
    this._prefs = typeof prefs === 'object' ? prefs : {};
    this._prefs.live = this._prefs.live || false;

    this._settings = {};
    this._enabledRules = {};

    this._replaceLabel = this._replaceLabel.bind(this);
    this._pasteLabel = this._pasteLabel.bind(this);
    this._initSafeTags();

    this._innerRules = [].concat(this._innerRules);
    this._rules = [].concat(this._rules);
    this._rules.forEach(this._prepareRule, this);

    this._prefs.disable && this.disable(this._prefs.disable);
    this._prefs.enable && this.enable(this._prefs.enable);
}

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
 * @return {Typograf} this
 */
Typograf.rule = function(rule) {
    var parts = rule.name.split('/');

    rule._enabled = rule.disabled === true ? false : true;
    rule._lang = parts[0];
    rule._group = parts[1];
    rule._name = parts[2];

    Typograf._setIndex(rule);

    Typograf.prototype._rules.push(rule);

    if (Typograf._needSortRules) {
        this._sortRules();
    }

    return this;
};

Typograf._langs = ['en', 'ru'];

Typograf._setIndex = function(rule) {
    var index = rule.index,
        t = typeof index,
        groupIndex = Typograf.groupIndexes[rule._group];

    if (t === 'undefined') {
        index = groupIndex;
    } else if (t === 'string') {
        index = groupIndex + parseInt(rule.index, 10);
    }

    rule._index = index;
};

/**
 * Add internal rule.
 * Internal rules are executed before main.
 *
 * @static
 * @param {Object} rule
 * @param {string} rule.name Name of rule
 * @param {Function} rule.handler Processing function
 * @return {Typograf} this
 */
Typograf.innerRule = function(rule) {
    Typograf.prototype._innerRules.push(rule);

    rule._lang = rule.name.split('/')[0];

    return this;
};

/**
 * Get/set data for use in rules.
 *
 * @static
 * @param {string|Object} key
 * @param {*} [value]
 * @return {*}
 */
Typograf.data = function(key, value) {
    if (typeof key === 'string') {
        if (arguments.length === 1) {
            return Typograf._data[key];
        } else {
            Typograf._data[key] = value;
        }
    } else if (typeof key === 'object') {
        Object.keys(key).forEach(function(k) {
            Typograf._data[k] = key[k];
        });
    }
};

Typograf._data = {};

Typograf._sortRules = function() {
    Typograf.prototype._rules.sort(function(a, b) {
        return a._index > b._index ? 1 : -1;
    });
};

Typograf._replace = function(text, re) {
    for (var i = 0; i < re.length; i++) {
        text = text.replace(re[i][0], re[i][1]);
    }

    return text;
};

Typograf._replaceNbsp = function(text) {
    return text.replace(/\u00A0/g, ' ');
};

Typograf._privateLabel = '\uDBFF';
Typograf._privateQuote = '\uDBFE';

Typograf.prototype = {
    constructor: Typograf,
    /**
     * Execute typographical rules for text.
     *
     * @param {string} text
     * @param {Object} [prefs]
     * @param {string} [prefs.lang] Language rules
     * @param {string} [prefs.mode] Type HTML entities
     * @param {string} [prefs.lineEnding] Line ending. 'LF' (Unix), 'CR' (Mac) or 'CRLF' (Windows). Default: 'LF'.
     * @return {string}
     */
    execute: function(text, prefs) {
        text = '' + text;

        if (!text) {
            return '';
        }

        prefs = prefs || {};

        var that = this,
            rulesForQueue = {},
            innerRulesForQueue = {},
            executeRulesForQueue = function(queue) {
                text = that._executeRules(text, rulesForQueue[queue], innerRulesForQueue[queue]);
            };

        this._lang = prefs.lang || this._prefs.lang || 'common';

        text = this._removeCR(text);

        this._innerRules.forEach(function(rule) {
            var q = rule.queue;
            innerRulesForQueue[q] = innerRulesForQueue[q] || [];
            innerRulesForQueue[q].push(rule);
        });

        this._rules.forEach(function(rule) {
            var q = rule.queue;
            rulesForQueue[q] = rulesForQueue[q] || [];
            rulesForQueue[q].push(rule);
        });

        this._isHTML = text.search(/(<\/?[a-z]|<!|&[lg]t;)/i) !== -1;

        executeRulesForQueue('start');

        text = this._hideSafeTags(text);

        text = this._utfication(text);

        if (this._prefs.live) {
            text = Typograf._replaceNbsp(text);
        }
        executeRulesForQueue('utf');

        executeRulesForQueue();

        text = this._modification(text, prefs.mode || this._prefs.mode);
        executeRulesForQueue('entity');

        text = this._showSafeTags(text);

        executeRulesForQueue('end');

        this._lang = null;
        this._isHTML = null;

        text = this._fixLineEnding(text, prefs.lineEnding || this._prefs.lineEnding);

        return text;
    },
    /**
     * Get/set a setting.
     *
     * @param {string} ruleName
     * @param {string} setting
     * @param {*} [value]
     * @return {*}
     */
    setting: function(ruleName, setting, value) {
        if (arguments.length <= 2) {
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
     * @param {string|string[]} ruleName
     * @return {Typograf} this
     */
    enable: function(ruleName) {
        return this._enable(ruleName, true);
    },
    /**
     * Disable a rule.
     *
     * @param {string|string[]} ruleName
     * @return {Typograf} this
     */
    disable: function(ruleName) {
        return this._enable(ruleName, false);
    },
    /**
     * Add safe tag.
     *
     * @example
     * // var t = new Typograf({lang: 'ru'});
     * // t.addSafeTag('<mytag>', '</mytag>');
     * // t.addSafeTag('<mytag>', '</mytag>', '.*?');
     * // t.addSafeTag(/<mytag>.*?</mytag>/gi);
     *
     * @param {string|RegExp} startTag
     * @param {string} [endTag]
     * @param {string} [middle]
     * @return {Typograf} this
    */
    addSafeTag: function(startTag, endTag, middle) {
        var tag = startTag instanceof RegExp ? startTag : [startTag, endTag, middle];

        this._safeTags.own.push(this._prepareSafeTag(tag));

        return this;
    },
    /**
     * Get data for use in rules.
     *
     * @param {string} key
     * @return {*}
     */
    data: function(key) {
        var lang = '';
        if (key.search('/') === -1) {
            lang = (this._lang || this._prefs.lang) + '/';
        }

        return Typograf.data(lang + key);
    },
    _quote: function(text, settings) {
        var letters = this.data('l') + '\u0301\\d',
            privateLabel = Typograf._privateLabel,
            lquote = settings.lquote,
            rquote = settings.rquote,
            lquote2 = settings.lquote2,
            rquote2 = settings.rquote2,
            quotes = '[' + Typograf.data('common/quote') + ']',
            phrase = '[' + letters + ')!?.:;#*,…]*?',
            reL = new RegExp('"([' + letters + '])', 'gi'),
            reR = new RegExp('(' + phrase + ')"(' + phrase + ')', 'gi'),
            reQuotes = new RegExp(quotes, 'g'),
            reFirstQuote = new RegExp('^(\\s)?(' + quotes + ')', 'g'),
            reOpeningTag = new RegExp('(^|\\s)' + quotes + privateLabel, 'g'),
            reClosingTag = new RegExp(privateLabel + quotes + '([\\s!?.:;#*,]|$)', 'g'),
            count = 0,
            symbols = this.data('lLd');

        text = text
            // Hide incorrect quotes.
            .replace(new RegExp('([' + symbols + '])"(?=[' + symbols + '])', 'g'), '$1' + Typograf._privateQuote)
            .replace(reQuotes, function() {
                count++;
                return '"';
            })
            .replace(reL, lquote + '$1') // Opening quote
            .replace(reR, '$1' + rquote + '$2') // Closing quote
            .replace(reOpeningTag, '$1' + lquote + privateLabel) // Opening quote and tag
            .replace(reClosingTag, privateLabel + rquote + '$1') // Tag and closing quote
            .replace(reFirstQuote, '$1' + lquote);

        if (lquote2 && rquote2 && count % 2 === 0) {
            text = this._innerQuote(text, settings);
        }

        // Restore incorrect quotes.
        return text.replace(new RegExp(Typograf._privateQuote, 'g'), '"');
    },
    _innerQuote: function(text, settings) {
        var openingQuotes = [settings.lquote],
            closingQuotes = [settings.rquote];

        if (settings.lquote2 && settings.rquote2) {
            openingQuotes.push(settings.lquote2);
            closingQuotes.push(settings.rquote2);

            if (settings.lquote3 && settings.rquote3) {
                openingQuotes.push(settings.lquote3);
                closingQuotes.push(settings.rquote3);
            }
        }

        var lquote = settings.lquote,
            rquote = settings.rquote,
            bufText = new Array(text.length),
            privateQuote = Typograf._privateQuote,
            minLevel = -1,
            maxLevel = openingQuotes.length - 1,
            level = minLevel;

        for (var i = 0, len = text.length; i < len; i++) {
            var letter = text[i];

            if (letter === lquote) {
                level++;
                if (level > maxLevel) {
                    level = maxLevel;
                }
                bufText.push(openingQuotes[level]);
            } else if (letter === rquote) {
                if (level <= minLevel) {
                    level = 0;
                    bufText.push(openingQuotes[level]);
                } else {
                    bufText.push(closingQuotes[level]);
                    level--;
                    if (level < minLevel) {
                        level = minLevel;
                    }
                }
            } else {
                if (letter === privateQuote) {
                    level = minLevel;
                }

                bufText.push(letter);
            }
        }

        return bufText.join('');
    },
    _executeRules: function(text, rules, innerRules) {
        innerRules && innerRules.forEach(function(rule) {
            text = this._ruleIterator(text, rule);
        }, this);

        rules && rules.forEach(function(rule) {
            text = this._ruleIterator(text, rule);
        }, this);

        return text;
    },
    _ruleIterator: function(text, rule) {
        var rlang = rule._lang,
            live = this._prefs.live;

        if ((live === true && rule.live === false) || (live === false && rule.live === true)) {
            return text;
        }

        if ((rlang === 'common' || rlang === this._lang) && this.enabled(rule.name)) {
            this._onBeforeRule && this._onBeforeRule(rule.name, text);
            text = rule.handler.call(this, text, this._settings[rule.name]);
            this._onAfterRule && this._onAfterRule(rule.name, text);
        }

        return text;
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
            settings = {};

        if (typeof rule.settings === 'object') {
            Object.keys(rule.settings).forEach(function(key) {
                settings[key] = rule.settings[key];
            });
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
        if (rule.search(/\*/) !== -1) {
            re = new RegExp(rule
                .replace(/\//g, '\\\/')
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
    },
    _initSafeTags: function() {
        var html = [
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
            html.push([
                '<' + tag + '(\\s[^>]*?)?>',
                '</' + tag + '>'
            ]);
        }, this);

        this._safeTags = {
            html: html.map(this._prepareSafeTag),
            own: [],
            url: [this._reUrl]
        };
    },
    _reUrl: new RegExp('(https?|file|ftp)://([a-zA-Z0-9\/+-=%&:_.~?]+[a-zA-Z0-9#+]*)', 'g'),
    _hideSafeTags: function(text) {
        var that = this,
            iterator = function(tag) {
                text = text.replace(that._prepareSafeTag(tag), that._pasteLabel);
            },
            hide = function(name) {
                that._safeTags[name].forEach(iterator);
            };

        this._hiddenSafeTags = {};
        this._iLabel = 0;

        hide('own');

        if (this._isHTML) {
            hide('html');
            text = this._hideHTMLTags(text);
        }

        hide('url');

        return text;
    },
    _prepareSafeTag: function(tag) {
        var re;

        if (tag instanceof RegExp) {
            re = tag;
        } else {
            var startTag = tag[0],
                endTag = tag[1],
                middle = typeof tag[2] === 'undefined' ? '[^]*?' : tag[2];

            re = new RegExp(startTag + middle + endTag, 'gi');
        }

        return re;
    },
    _getPrivateLabel: function(i) {
        var label = Typograf._privateLabel;
        return label + 'tf' + i + label;
    },
    _pasteLabel: function(match) {
        var key = this._getPrivateLabel(this._iLabel);
        this._hiddenSafeTags[key] = match;
        this._iLabel++;

        return key;
    },
    _replaceLabel: function(match) {
        return this._hiddenSafeTags[match];
    },
    _hideHTMLTags: function(text) {
        return text
            .replace(/<\/?[a-z][^]*?>/gi, this._pasteLabel) // Tags
            .replace(/&lt;\/?[a-z][^]*?&gt;/gi, this._pasteLabel) // Escaping tags
            .replace(/&[gl]t;/gi, this._pasteLabel);
    },
    _showSafeTags: function(text) {
        var label = Typograf._privateLabel,
            reReplace = new RegExp(label + 'tf\\d+' + label, 'g'),
            reSearch = new RegExp(label + 'tf\\d'),
            len = 0;

        Object.keys(this._safeTags).forEach(function(tags) {
            len += tags.length;
        });

        for (var i = 0; i < len; i++) {
            text = text.replace(reReplace, this._replaceLabel);
            if (text.search(reSearch) === -1) {
                break;
            }
        }

        this._hiddenSafeTags = {};

        return text;
    },
    _utfication: function(text) {
        if (text.search(/&#/) !== -1) {
            text = this._decHexToUtf(text);
        }

        if (text.search(/&[a-z]/i) !== -1) {
            this.entities.forEach(function(entity) {
                text = text.replace(entity[3], entity[2]);
            });
        }

        return text.replace(/&quot;/g, '"');
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
        if (mode === 'name' || mode === 'digit') {
            var index = mode === 'name' ? 0 : 1;
            this.entities.forEach(function(entity) {
                if (entity[index]) {
                    text = text.replace(entity[4], entity[index]);
                }
            });
        }

        return text;
    }
};
