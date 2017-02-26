/*! Typograf | © 2017 Denis Seleznev | https://github.com/typograf/typograf/ */

(function(root, factory) {
    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define('typograf', [], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Typograf = factory();
    }
}(this, function() {
    'use strict';

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
    function Typograf(prefs) {
        this._prefs = typeof prefs === 'object' ? prefs : {};
        this._prefs.live = this._prefs.live || false;

        this._locale = Typograf._prepareLocale(this._prefs.locale);

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
        _reUrl: new RegExp('(https?|file|ftp)://([a-zA-Z0-9\/+-=%&:_.~?]+[a-zA-Z0-9#+]*)', 'g'),
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
            text = '' + text;

            if (!text) { return ''; }

            prefs = prefs || {};

            var that = this;

            this._locale = Typograf._prepareLocale(prefs.locale, this._prefs.locale);

            if (!this._locale.length || !this._locale[0]) {
                throw Error('Not defined the property "locale".');
            }

            if (!Typograf.hasLocale(this._locale[0])) {
                throw Error('"' + this._locale[0] + '" is not supported locale.');
            }

            text = this._removeCR(text);

            this._isHTML = text.search(/(<\/?[a-z]|<!|&[lg]t;)/i) !== -1;

            text = this._executeRules(text, 'start');

            text = this._safeTags.hide(text, this._isHTML, function(t, group) {
                return that._executeRules(t, 'hide-safe-tags-' + group);
            });

            text = this._executeRules(text, 'hide-safe-tags');

            text = Typograf.HtmlEntities.toUtf(text);

            if (this._prefs.live) { text = Typograf._replaceNbsp(text); }

            text = this._executeRules(text, 'utf');

            text = this._executeRules(text);

            text = Typograf.HtmlEntities.restore(text, prefs.htmlEntity || this._prefs.htmlEntity || {});

            text = this._executeRules(text, 'html-entities');

            text = this._safeTags.show(text, function(t, group) {
                return that._executeRules(t, 'show-safe-tags-' + group);
            });

            text = this._executeRules(text, 'end');

            this._isHTML = null;
            this._locale = Typograf._prepareLocale(this._prefs.locale);

            return this._fixLineEnding(text, prefs.lineEnding || this._prefs.lineEnding);
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
        _executeRules: function(text, queue) {
            queue = queue || 'default';

            var rules = this._rulesByQueues[queue],
                innerRules = this._innerRulesByQueues[queue];

            innerRules && innerRules.forEach(function(rule) {
                text = this._ruleIterator(text, rule);
            }, this);

            rules && rules.forEach(function(rule) {
                text = this._ruleIterator(text, rule);
            }, this);

            return text;
        },
        _ruleIterator: function(text, rule) {
            var rlocale = rule._locale,
                live = this._prefs.live;

            if ((live === true && rule.live === false) || (live === false && rule.live === true)) {
                return text;
            }

            if ((rlocale === 'common' || rlocale === this._locale[0]) && this.isEnabledRule(rule.name)) {
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
        }
    };

    Typograf.version = '6.0.0';
    
    Typograf._mix(Typograf, {
        /**
         * Get data for use in rules.
         *
         * @static
         * @param {string} key
         *
         * @returns {*}
         */
        getData: function(key) {
            return this._data[key];
        },
        /**
         * Set data for use in rules.
         *
         * @static
         * @param {string|Object} key
         * @param {*} [value]
         */
        setData: function(key, value) {
            if (typeof key === 'string') {
                this.addLocale(key);
                this._data[key] = value;
            } else if (typeof key === 'object') {
                Object.keys(key).forEach(function(k) {
                    this.addLocale(k);
                    this._data[k] = key[k];
                }, this);
            }
        },
        _data: {}
    });
    
    /**
     * Get data for use in rules.
     *
     * @param {string} key
     *
     * @returns {*}
     */
    Typograf.prototype.getData = function(key) {
        var str = '';
        if (key.search('/') === -1) {
            if (key === 'char') {
                this._locale.forEach(function(item) {
                    str += Typograf.getData(item + '/' + key);
                }, this);
    
                return str;
            } else {
                return Typograf.getData(this._locale[0] + '/' + key);
            }
        } else {
            return Typograf.getData(key);
        }
    };
    
    Typograf._mix(Typograf, {
        /**
         * Add a locale.
         *
         * @static
         *
         * @param {string} locale
         */
        addLocale: function(locale) {
            var code = (locale || '').split('/')[0];
            if (code && code !== 'common' && !this.hasLocale(code)) {
                this._locales.push(code);
                this._locales.sort();
            }
        },
        /**
         * Get locales.
         *
         * @static
         *
         * @returns {Array}
         */
        getLocales: function() {
            return this._locales;
        },
        /**
         * Has a locale.
         *
         * @static
         *
         * @param {string} locale
         *
         * @returns {boolean}
         */
        hasLocale: function(locale) {
            return locale === 'common' || this._locales.indexOf(locale) !== -1;
        },
        _prepareLocale: function(locale1, locale2) {
            var locale = locale1 || locale2,
                result = locale;
    
            if (!Array.isArray(locale)) { result = [locale]; }
    
            return result;
        },
        _locales: []
    });
    
    function SafeTags() {
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
    
        this._tags = {
            own: [],
            html: html.map(this._prepareRegExp),
            url: [Typograf._reUrl]
        };
    
        this._pasteLabel = this._pasteLabel.bind(this);
        this._replaceLabel = this._replaceLabel.bind(this);
    
        this._groups = ['own', 'html', 'url'];
        this._reservedGroups = [].concat(this._groups).reverse();
    }
    
    SafeTags.prototype = {
        constructor: SafeTags,
        /**
         * Add own safe tag.
         *
         * @param {RegExp|string[]} tag
         */
        add: function(tag) {
            this._tags.own.push(this._prepareRegExp(tag));
        },
        /**
         * Show safe tags.
         *
         * @param {string} text
         * @param {Function} callback
         * @return {string}
         */
        show: function(text, callback) {
            var label = Typograf._privateLabel,
                reReplace = new RegExp(label + 'tf\\d+' + label, 'g'),
                reSearch = new RegExp(label + 'tf\\d');
    
            this._reservedGroups.forEach(function(group) {
                this._currentGroup = group;
    
                for (var i = 0, len = this._tags[group].length; i < len; i++) {
                    text = text.replace(reReplace, this._replaceLabel);
                    if (text.search(reSearch) === -1) { break; }
                }
    
                text = callback(text, group);
            }, this);
    
            this._hiddenTags = null;
    
            return text;
        },
        /**
         * Hide safe tags.
         *
         * @param {string} text
         * @param {boolean} isHTML
         * @param {Function} callback
         * @return {string}
         */
        hide: function(text, isHTML, callback) {
            this._isHTML = isHTML;
    
            this._hiddenTags = {};
            this._groups.forEach(function(group) {
                this._hiddenTags[group] = {};
            }, this);
            this._iLabel = 0;
    
            this._groups.forEach(function(group) {
                text = this._hide(text, group);
                text = callback(text, group);
            }, this);
    
            return text;
        },
        _hide: function(text, group) {
            this._currentGroup = group;
    
            this._tags[group].forEach(function(tag) {
                text = text.replace(this._prepareRegExp(tag), this._pasteLabel);
            }, this);
    
            if (group === 'html' && this._isHTML) {
                text = text
                    .replace(/<\/?[a-z][^]*?>/gi, this._pasteLabel) // Tags
                    .replace(/&lt;\/?[a-z][^]*?&gt;/gi, this._pasteLabel) // Escaping tags
                    .replace(/&[gl]t;/gi, this._pasteLabel);
            }
    
            return text;
        },
        _prepareRegExp: function(tag) {
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
            this._hiddenTags[this._currentGroup][key] = match;
            this._iLabel++;
    
            return key;
        },
        _replaceLabel: function(match) {
            return this._hiddenTags[this._currentGroup][match] || match;
        }
    };
    
    Typograf.inlineElements = [
        'a',
        'abbr',
        'acronym',
        'b',
        'bdo',
        'big',
        'br',
        'button',
        'cite',
        'code',
        'dfn',
        'em',
        'i',
        'img',
        'input',
        'kbd',
        'label',
        'map',
        'object',
        'q',
        'samp',
        'script',
        'select',
        'small',
        'span',
        'strong',
        'sub',
        'sup',
        'textarea',
        'time',
        'tt',
        'var'
    ];
    
    Typograf.blockElements = [
        'address',
        'article',
        'aside',
        'blockquote',
        'canvas',
        'dd',
        'div',
        'dl',
        'fieldset',
        'figcaption',
        'figure',
        'footer',
        'form',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'header',
        'hgroup',
        'hr',
        'li',
        'main',
        'nav',
        'noscript',
        'ol',
        'output',
        'p',
        'pre',
        'section',
        'table',
        'tfoot',
        'ul',
        'video'
    ];
    
    Typograf.HtmlEntities = {
        init: function() {
            // http://www.w3.org/TR/html4/sgml/entities
            var visibleEntities = [
                ['iexcl', 161],
                ['cent', 162],
                ['pound', 163],
                ['curren', 164],
                ['yen', 165],
                ['brvbar', 166],
                ['sect', 167],
                ['uml', 168],
                ['copy', 169],
                ['ordf', 170],
                ['laquo', 171],
                ['not', 172],
                ['reg', 174],
                ['macr', 175],
                ['deg', 176],
                ['plusmn', 177],
                ['sup2', 178],
                ['sup3', 179],
                ['acute', 180],
                ['micro', 181],
                ['para', 182],
                ['middot', 183],
                ['cedil', 184],
                ['sup1', 185],
                ['ordm', 186],
                ['raquo', 187],
                ['frac14', 188],
                ['frac12', 189],
                ['frac34', 190],
                ['iquest', 191],
                ['Agrave', 192],
                ['Aacute', 193],
                ['Acirc', 194],
                ['Atilde', 195],
                ['Auml', 196],
                ['Aring', 197],
                ['AElig', 198],
                ['Ccedil', 199],
                ['Egrave', 200],
                ['Eacute', 201],
                ['Ecirc', 202],
                ['Euml', 203],
                ['Igrave', 204],
                ['Iacute', 205],
                ['Icirc', 206],
                ['Iuml', 207],
                ['ETH', 208],
                ['Ntilde', 209],
                ['Ograve', 210],
                ['Oacute', 211],
                ['Ocirc', 212],
                ['Otilde', 213],
                ['Ouml', 214],
                ['times', 215],
                ['Oslash', 216],
                ['Ugrave', 217],
                ['Uacute', 218],
                ['Ucirc', 219],
                ['Uuml', 220],
                ['Yacute', 221],
                ['THORN', 222],
                ['szlig', 223],
                ['agrave', 224],
                ['aacute', 225],
                ['acirc', 226],
                ['atilde', 227],
                ['auml', 228],
                ['aring', 229],
                ['aelig', 230],
                ['ccedil', 231],
                ['egrave', 232],
                ['eacute', 233],
                ['ecirc', 234],
                ['euml', 235],
                ['igrave', 236],
                ['iacute', 237],
                ['icirc', 238],
                ['iuml', 239],
                ['eth', 240],
                ['ntilde', 241],
                ['ograve', 242],
                ['oacute', 243],
                ['ocirc', 244],
                ['otilde', 245],
                ['ouml', 246],
                ['divide', 247],
                ['oslash', 248],
                ['ugrave', 249],
                ['uacute', 250],
                ['ucirc', 251],
                ['uuml', 252],
                ['yacute', 253],
                ['thorn', 254],
                ['yuml', 255],
                ['fnof', 402],
                ['Alpha', 913],
                ['Beta', 914],
                ['Gamma', 915],
                ['Delta', 916],
                ['Epsilon', 917],
                ['Zeta', 918],
                ['Eta', 919],
                ['Theta', 920],
                ['Iota', 921],
                ['Kappa', 922],
                ['Lambda', 923],
                ['Mu', 924],
                ['Nu', 925],
                ['Xi', 926],
                ['Omicron', 927],
                ['Pi', 928],
                ['Rho', 929],
                ['Sigma', 931],
                ['Tau', 932],
                ['Upsilon', 933],
                ['Phi', 934],
                ['Chi', 935],
                ['Psi', 936],
                ['Omega', 937],
                ['alpha', 945],
                ['beta', 946],
                ['gamma', 947],
                ['delta', 948],
                ['epsilon', 949],
                ['zeta', 950],
                ['eta', 951],
                ['theta', 952],
                ['iota', 953],
                ['kappa', 954],
                ['lambda', 955],
                ['mu', 956],
                ['nu', 957],
                ['xi', 958],
                ['omicron', 959],
                ['pi', 960],
                ['rho', 961],
                ['sigmaf', 962],
                ['sigma', 963],
                ['tau', 964],
                ['upsilon', 965],
                ['phi', 966],
                ['chi', 967],
                ['psi', 968],
                ['omega', 969],
                ['thetasym', 977],
                ['upsih', 978],
                ['piv', 982],
                ['bull', 8226],
                ['hellip', 8230],
                ['prime', 8242],
                ['Prime', 8243],
                ['oline', 8254],
                ['frasl', 8260],
                ['weierp', 8472],
                ['image', 8465],
                ['real', 8476],
                ['trade', 8482],
                ['alefsym', 8501],
                ['larr', 8592],
                ['uarr', 8593],
                ['rarr', 8594],
                ['darr', 8595],
                ['harr', 8596],
                ['crarr', 8629],
                ['lArr', 8656],
                ['uArr', 8657],
                ['rArr', 8658],
                ['dArr', 8659],
                ['hArr', 8660],
                ['forall', 8704],
                ['part', 8706],
                ['exist', 8707],
                ['empty', 8709],
                ['nabla', 8711],
                ['isin', 8712],
                ['notin', 8713],
                ['ni', 8715],
                ['prod', 8719],
                ['sum', 8721],
                ['minus', 8722],
                ['lowast', 8727],
                ['radic', 8730],
                ['prop', 8733],
                ['infin', 8734],
                ['ang', 8736],
                ['and', 8743],
                ['or', 8744],
                ['cap', 8745],
                ['cup', 8746],
                ['int', 8747],
                ['there4', 8756],
                ['sim', 8764],
                ['cong', 8773],
                ['asymp', 8776],
                ['ne', 8800],
                ['equiv', 8801],
                ['le', 8804],
                ['ge', 8805],
                ['sub', 8834],
                ['sup', 8835],
                ['nsub', 8836],
                ['sube', 8838],
                ['supe', 8839],
                ['oplus', 8853],
                ['otimes', 8855],
                ['perp', 8869],
                ['sdot', 8901],
                ['lceil', 8968],
                ['rceil', 8969],
                ['lfloor', 8970],
                ['rfloor', 8971],
                ['lang', 9001],
                ['rang', 9002],
                ['spades', 9824],
                ['clubs', 9827],
                ['hearts', 9829],
                ['diams', 9830],
                ['loz', 9674],
                ['OElig', 338],
                ['oelig', 339],
                ['Scaron', 352],
                ['scaron', 353],
                ['Yuml', 376],
                ['circ', 710],
                ['tilde', 732],
                ['ndash', 8211],
                ['mdash', 8212],
                ['lsquo', 8216],
                ['rsquo', 8217],
                ['sbquo', 8218],
                ['ldquo', 8220],
                ['rdquo', 8221],
                ['bdquo', 8222],
                ['dagger', 8224],
                ['Dagger', 8225],
                ['permil', 8240],
                ['lsaquo', 8249],
                ['rsaquo', 8250],
                ['euro', 8364],
                ['NestedGreaterGreater', 8811],
                ['NestedLessLess', 8810]
            ];
    
            var invisibleEntities = [
                ['nbsp', 160],
                ['thinsp', 8201],
                ['ensp', 8194],
                ['emsp', 8195],
                ['shy', 173],
                ['zwnj', 8204],
                ['zwj', 8205],
                ['lrm', 8206],
                ['rlm', 8207]
            ];
    
            this._entities = this._prepareEntities([].concat(visibleEntities, invisibleEntities));
    
            this._entitiesByName = {};
            this._entitiesByNameEntity = {};
            this._entitiesByDigitEntity = {};
            this._entitiesByUtf = {};
    
            this._entities.forEach(function(entity) {
                this._entitiesByName[entity.name] = entity;
                this._entitiesByNameEntity[entity.nameEntity] = entity;
                this._entitiesByDigitEntity[entity.digitEntity] = entity;
                this._entitiesByUtf[entity.utf] = entity;
            }, this);
    
            this._invisibleEntities = this._prepareEntities(invisibleEntities);
        },
        /**
         * Entities as name or digit to UTF-8.
         *
         * @param {string} text
         * @return {string}
         */
        toUtf: function(text) {
            if (text.search(/&#/) !== -1) {
                text = this.decHexToUtf(text);
            }
    
            if (text.search(/&[a-z]/i) !== -1) {
                this._entities.forEach(function(entity) {
                    text = text.replace(entity.reName, entity.utf);
                });
            }
    
            return text.replace(/&quot;/g, '"');
        },
        /**
         * Entities in decimal or hexadecimal form to UTF-8.
         *
         * @param {string} text
         * @return {string}
         */
        decHexToUtf: function(text) {
            return text
                .replace(/&#(\d{1,6});/gi, function($0, $1) {
                    return String.fromCharCode(parseInt($1, 10));
                })
                .replace(/&#x([\da-f]{1,6});/gi, function($0, $1) {
                    return String.fromCharCode(parseInt($1, 16));
                });
        },
        /**
         * Restore HTML entities in text.
         *
         * @param {string} text
         * @param {HtmlEntity} params
         * @returns {string}
         */
        restore: function(text, params) {
            var type = params.type,
                entities = this._entities;
    
            if (type === 'name' || type === 'digit') {
                if (params.onlyInvisible || params.list) {
                    entities = [];
    
                    if (params.onlyInvisible) {
                        entities = entities.concat(this._invisibleEntities);
                    }
    
                    if (params.list) {
                        entities = entities.concat(this._prepareListParam(params.list));
                    }
                }
    
                text = this._restoreEntitiesByIndex(
                    text,
                    type + 'Entity',
                    entities
                );
            }
    
            return text;
        },
        /**
         * Get a entity by utf using the type.
         *
         * @param {string} symbol
         * @param {string} [type]
         * @returns {string}
         */
        getByUtf: function(symbol, type) {
            var result = '';
    
            switch (type) {
                case 'digit':
                    result = this._entitiesByDigitEntity[symbol];
                    break;
                case 'name':
                    result = this._entitiesByNameEntity[symbol];
                    break;
                default:
                    result = symbol;
                    break;
            }
    
            return result;
        },
        _prepareEntities: function(entities) {
            var result = [];
    
            entities.forEach(function(entity) {
                var name = entity[0],
                    digit = entity[1],
                    utf = String.fromCharCode(digit),
                    item = {
                        name: name,
                        nameEntity: '&' + name + ';', // &nbsp;
                        digitEntity: '&#' + digit + ';', // &#160;
                        utf: utf, // \u00A0
                        reName: new RegExp('&' + name + ';', 'g'),
                        reUtf: new RegExp(utf, 'g')
                    };
    
                result.push(item);
            }, this);
    
            return result;
        },
        _prepareListParam: function(list) {
            var result = [];
    
            list.forEach(function(name) {
                var entity = this._entitiesByName[name];
                if (entity) {
                    result.push(entity);
                }
            }, this);
    
            return result;
        },
        _restoreEntitiesByIndex: function(text, type, entities) {
            entities.forEach(function(entity) {
                text = text.replace(entity.reUtf, entity[type]);
            });
    
            return text;
        }
    };
    
    Typograf.HtmlEntities.init();
    
    /**
     * @typedef HtmlEntity
     *
     * @property {string} type - 'default' - UTF-8, 'digit' - &#160;, 'name' - &nbsp;
     * @property {boolean} [onlyInvisible]
     * @property {string[]} [list]
     */
    
    Typograf.groupIndexes = {
        symbols: 110,
        space: 210,
        dash: 310,
        punctuation: 410,
        nbsp: 510,
        'number': 610,
        money: 710,
        date: 810,
        other: 910,
        optalign: 1010,
        typo: 1110,
        html: 1210
    };
    
    Typograf.setData('be/char', 'абвгдежзйклмнопрстуфхцчшыьэюяёіўґ');
    
        Typograf.setData('be/quote', {
        left: '«“',
        right: '»”'
    });
    
        Typograf.setData('bg/char', 'абвгдежзийклмнопрстуфхцчшщъьюя');
    
        Typograf.setData('bg/quote', {
        left: '„’',
        right: '“’'
    });
    
        Typograf.setData('ca/char', 'abcdefghijlmnopqrstuvxyzàçèéíïòóúü');
    
        Typograf.setData('ca/quote', {
        left: '«“',
        right: '»”'
    });
    
        Typograf.setData('common/char', 'a-z');
    
        Typograf.setData('common/dash', '--?|‒|–|—'); // --, &#8210, &ndash, &mdash
    
        Typograf.setData('common/quote', '«‹»›„“‟”"');
    
        Typograf.setData('cs/char', 'a-záéíóúýčďěňřšťůž');
    
        Typograf.setData('cs/quote', {
        left: '„‚',
        right: '“‘'
    });
    
        Typograf.setData('da/char', 'a-zåæø');
    
        Typograf.setData('da/quote', {
        left: '»›',
        right: '«‹'
    });
    
        Typograf.setData('de/char', 'a-zßäöü');
    
        Typograf.setData('de/quote', {
        left: '„‚',
        right: '“‘'
    });
    
        Typograf.setData('el/char', 'ΐάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϲάέήίόύώ');
    
        Typograf.setData('el/quote', {
        left: '«“',
        right: '»”'
    });
    
        Typograf.setData('en-GB/char', 'a-z');
    
        Typograf.setData('en-GB/quote', {
        left: '“‘',
        right: '”’'
    });
    
        Typograf.setData('en-US/char', 'a-z');
    
        Typograf.setData('en-US/quote', {
        left: '“‘',
        right: '”’'
    });
    
        Typograf.setData('eo/char', 'abcdefghijklmnoprstuvzĉĝĥĵŝŭ');
    
        Typograf.setData('eo/quote', {
        left: '“‘',
        right: '”’'
    });
    
        Typograf.setData('es/char', 'a-záéíñóúü');
    
        Typograf.setData('es/quote', {
        left: '«“',
        right: '»”'
    });
    
        Typograf.setData('et/char', 'abdefghijklmnoprstuvzäõöüšž');
    
        Typograf.setData('et/quote', {
        left: '„«',
        right: '“»'
    });
    
        Typograf.setData('fi/char', 'abcdefghijklmnopqrstuvyöäå');
    
        Typograf.setData('fi/quote', {
        left: '”’',
        right: '”’'
    });
    
        Typograf.setData('fr/char', 'a-zàâçèéêëîïôûüœæ');
    
        Typograf.setData('fr/quote', {
        left: '«“',
        right: '»”'
    });
    
        Typograf.setData('ga/char', 'abcdefghilmnoprstuvwxyzáéíóú');
    
        Typograf.setData('ga/quote', {
        left: '“‘',
        right: '”’'
    });
    
        Typograf.setData('hu/char', 'a-záäéíóöúüőű');
    
        Typograf.setData('hu/quote', {
        left: '„»',
        right: '”«'
    });
    
        Typograf.setData('it/char', 'a-zàéèìòù');
    
        Typograf.setData('it/quote', {
        left: '«“',
        right: '»”'
    });
    
        Typograf.setData('lv/char', 'abcdefghijklmnopqrstuvxzæœ');
    
        Typograf.setData('lv/quote', {
        left: '«„',
        right: '»“'
    });
    
        Typograf.setData('nl/char', 'a-zäçèéêëîïñöûü');
    
        Typograf.setData('nl/quote', {
        left: '‘“',
        right: '’”'
    });
    
        Typograf.setData('no/char', 'a-zåæèéêòóôø');
    
        Typograf.setData('no/quote', {
        left: '«’',
        right: '»’'
    });
    
        Typograf.setData('pl/char', 'abcdefghijklmnoprstuvwxyzóąćęłńśźż');
    
        Typograf.setData('pl/quote', {
        left: '„«',
        right: '”»'
    });
    
        Typograf.setData('ro/char', 'abcdefghijklmnoprstuvxzîășț');
    
        Typograf.setData('ro/quote', {
        left: '„«',
        right: '”»'
    });
    
        Typograf.setData('ru/char', 'а-яё');
    
        Typograf.setData({
        'ru/dashBefore': '(^| |\\n)',
        'ru/dashAfter': '(?=[\u00A0 ,.?:!]|$)',
        'ru/dashAfterDe': '(?=[,.?:!]|[\u00A0 ][^А-ЯЁ]|$)'
    });
    
        Typograf.setData({
        'ru/l': 'а-яёa-z',
        'ru/L': 'А-ЯЁA-Z'
    });
    
        Typograf.setData({
        'ru/month': 'январь|февраль|март|апрель|май|июнь|июль|август|сентябрь|октябрь|ноябрь|декабрь',
        'ru/monthGenCase': 'января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря',
        'ru/monthPreCase': 'январе|феврале|марте|апреле|мае|июне|июле|августе|сентябре|октябре|ноябре|декабре',
        'ru/shortMonth': 'янв|фев|мар|апр|ма[ейя]|июн|июл|авг|сен|окт|ноя|дек'
    });
    
        Typograf.setData('ru/quote', {
        left: '«„‚',
        right: '»“‘',
        removeDuplicateQuotes: true
    });
    
        Typograf.setData('ru/weekday', 'понедельник|вторник|среда|четверг|пятница|суббота|воскресенье');
    
        Typograf.setData('sk/char', 'abcdefghijklmnoprstuvwxyzáäéíóôúýčďľňŕšťž');
    
        Typograf.setData('sk/quote', {
        left: '„‚',
        right: '“‘'
    });
    
        Typograf.setData('sl/char', 'a-zčšž');
    
        Typograf.setData('sl/quote', {
        left: '„‚',
        right: '“‘'
    });
    
        Typograf.setData('sr/char', 'abcdefghijklmnoprstuvzćčđšž');
    
        Typograf.setData('sr/quote', {
        left: '„’',
        right: '”’'
    });
    
        Typograf.setData('sv/char', 'a-zäåéö');
    
        Typograf.setData('sv/quote', {
        left: '”’',
        right: '”’'
    });
    
        Typograf.setData('tr/char', 'abcdefghijklmnoprstuvyzâçîöûüğış');
    
        Typograf.setData('tr/quote', {
        left: '“‘',
        right: '”’'
    });
    
        Typograf.setData('uk/char', 'абвгдежзийклмнопрстуфхцчшщьюяєіїґ');
    
        Typograf.setData('uk/quote', {
        left: '«„',
        right: '»“'
    });
    
    Typograf.addRule({
        name: 'common/html/e-mail',
        queue: 'end',
        handler: function(text) {
            return this._isHTML ? text : text.replace(
                /(^|[\s;(])([\w\-.]{2,})@([\w\-.]{2,})\.([a-z]{2,6})([)\s.,!?]|$)/gi,
                '$1<a href="mailto:$2@$3.$4">$2@$3.$4</a>$5'
            );
        },
        disabled: true
    });
    
    Typograf.addRule({
        name: 'common/html/escape',
        index: '+100',
        queue: 'end',
        handler: function(text) {
            var entityMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                '\'': '&#39;',
                '/': '&#x2F;'
            };
    
            return text.replace(/[&<>"'\/]/g, function(s) {
                return entityMap[s];
            });
        },
        disabled: true
    });
    
    Typograf.addRule({
        name: 'common/html/nbr',
        index: '+5',
        queue: 'end',
        handler: function(text) {
            return text.replace(/([^\n>])\n(?=[^\n])/g, '$1<br/>\n');
        },
        disabled: true
    });
    
    Typograf.addRule({
        name: 'common/html/p',
        queue: 'end',
        handler: function(text) {
            var blockRe = new RegExp('<(' + Typograf.blockElements.join('|') + ')[>\s]'),
                separator = '\n\n',
                buffer = text.split(separator);
    
            buffer.forEach(function(text, i, data) {
                if (!text.trim()) { return; }
    
                if (!blockRe.test(text)) {
                    data[i] = text.replace(/^(\s*)/, '$1<p>').replace(/(\s*)$/, '</p>$1');
                }
            });
    
            return buffer.join(separator);
        },
        disabled: true
    });
    
    Typograf.addRule({
        name: 'common/html/stripTags',
        index: '+99',
        queue: 'end',
        handler: function(text) {
            return text.replace(/<[^>]+>/g, '');
        },
        disabled: true
    });
    
    Typograf.addRule({
        name: 'common/html/url',
        queue: 'end',
        handler: function(text) {
            return this._isHTML ? text : text.replace(Typograf._reUrl, function($0, protocol, path) {
                path = path
                    .replace(/([^\/]+\/?)(\?|#)$/, '$1') // Remove ending ? and #
                    .replace(/^([^\/]+)\/$/, '$1'); // Remove ending /
    
                if (protocol === 'http') {
                    path = path.replace(/^([^\/]+)(:80)([^\d]|\/|$)/, '$1$3'); // Remove 80 port
                } else if (protocol === 'https') {
                    path = path.replace(/^([^\/]+)(:443)([^\d]|\/|$)/, '$1$3'); // Remove 443 port
                }
    
                var url = path,
                    fullUrl = protocol + '://' + path,
                    firstPart = '<a href="' + fullUrl + '">';
    
                if (protocol === 'http' || protocol === 'https') {
                    url = url.replace(/^www\./, '');
    
                    return firstPart + (protocol === 'http' ? url : protocol + '://' + url) + '</a>';
                }
    
                return firstPart + fullUrl + '</a>';
            });
        },
        disabled: true
    });
    
    Typograf.addRule({
        name: 'common/nbsp/afterNumber',
        handler: function(text) {
            var re = '(^|\\D)(\\d{1,5}) ([' +
                this.getData('char') +
                ']{2,})';
    
            return text.replace(new RegExp(re, 'gi'), '$1$2\u00A0$3');
        },
        disabled: true
    });
    
    Typograf.addRule({
        name: 'common/nbsp/afterParagraph',
        handler: function(text) {
            // \u2009 - THIN SPACE
            // \u202F - NARROW NO-BREAK SPACE
            return text.replace(/\u00A7[ \u00A0\u2009]?(\d|I|V|X)/g, '\u00A7\u202F$1');
        }
    });
    
    Typograf.addRule({
        name: 'common/nbsp/afterShortWord',
        handler: function(text, settings) {
            var len = settings.lengthShortWord,
                before = ' \u00A0(' + Typograf._privateLabel + this.getData('common/quote'),
                subStr = '(^|[' + before + '])([' + this.getData('char') + ']{1,' + len + '}) ',
                newSubStr = '$1$2\u00A0',
                re = new RegExp(subStr, 'gim');
    
            return text
                .replace(re, newSubStr)
                .replace(re, newSubStr);
        },
        settings: {
            lengthShortWord: 2
        }
    });
    
    Typograf.addRule({
        name: 'common/nbsp/beforeShortLastNumber',
        handler: function(text, settings) {
            var ch = this.getData('char'),
                CH = ch.toUpperCase(),
                re = new RegExp('([' + ch + CH +
                ']) (?=\\d{1,' + settings.lengthLastNumber +
                '}[-+−%\'"' + this.getData('quote').right + ']?([.!?…]( [' +
                CH + ']|$)|$))', 'gm');
    
            return text.replace(re, '$1\u00A0');
        },
        live: false,
        settings: {
            lengthLastNumber: 2
        }
    });
    
    Typograf.addRule({
        name: 'common/nbsp/beforeShortLastWord',
        handler: function(text, settings) {
            var ch = this.getData('char'),
                CH = ch.toUpperCase(),
                re = new RegExp('([' + ch + '\\d]) ([' +
                    ch + CH + ']{1,' + settings.lengthLastWord +
                    '}[.!?…])( [' + CH + ']|$)', 'g');
            return text.replace(re, '$1\u00A0$2$3');
        },
        settings: {
            lengthLastWord: 3
        }
    });
    
    Typograf.addRule({
        name: 'common/nbsp/dpi',
        handler: function(text) {
            return text.replace(/(\d) ?(lpi|dpi)(?!\w)/, '$1\u00A0$2');
        }
    });
    
    (function() {
    
        function replaceNbsp($0, $1, $2, $3) {
            return $1 + $2.replace(/([^\u00A0])\u00A0([^\u00A0])/g, '$1 $2') + $3;
        }
    
        Typograf.addRule({
            name: 'common/nbsp/nowrap',
            queue: 'end',
            handler: function(text) {
                return text
                    .replace(/(<nowrap>)(.*?)(<\/nowrap>)/g, replaceNbsp)
                    .replace(/(<nobr>)(.*?)(<\/nobr>)/g, replaceNbsp);
            }
        });
    
    })();
    
    Typograf.addRule({
        name: 'common/nbsp/replaceNbsp',
        queue: 'utf',
        live: false,
        handler: Typograf._replaceNbsp,
        disabled: true
    });
    
    Typograf.addRule({
        name: 'common/number/fraction',
        handler: function(text) {
            return text.replace(/(^|\D)1\/2(\D|$)/g, '$1½$2')
                .replace(/(^|\D)1\/4(\D|$)/g, '$1¼$2')
                .replace(/(^|\D)3\/4(\D|$)/g, '$1¾$2');
        }
    });
    
    Typograf.addRule({
        name: 'common/number/mathSigns',
        handler: function(text) {
            return Typograf._replace(text, [
                [/!=/g, '≠'],
                [/<=/g, '≤'],
                [/(^|[^=])>=/g, '$1≥'],
                [/<=>/g, '⇔'],
                [/<</g, '≪'],
                [/>>/g, '≫'],
                [/~=/g, '≅'],
                [/(^|[^+])\+-/g, '$1±']
            ]);
        }
    });
    
    Typograf.addRule({
        name: 'common/number/times',
        handler: function(text) {
            return text.replace(/(\d)[ \u00A0]?[xх][ \u00A0]?(\d)/g, '$1×$2');
        }
    });
    
    Typograf.addRule({
        name: 'common/other/delBOM',
        queue: 'start',
        index: -1,
        handler: function(text) {
            if (text.charCodeAt(0) === 0xFEFF) {
                return text.slice(1);
            }
    
            return text;
        }
    });
    
    Typograf.addRule({
        name: 'common/other/repeatWord',
        handler: function(text, settings) {
            var punc = '[;:,.?! \n' + this.getData('common/quote') + ']';
            var re = new RegExp('(' + punc + '|^)' + 
                '([' + this.getData('char') + ']{' + settings.min + ',}) ' + 
                '\\2(' + punc + '|$)', 'gi');
    
            return text.replace(re, '$1$2$3');
        },
        settings: {min: 2},
        disabled: true
    });
    
    Typograf.addRule({
        name: 'common/punctuation/apostrophe',
        handler: function(text) {
            var letters = '([' + this.getData('char') + '])',
                re = new RegExp(letters + '\'' + letters, 'gi');
    
            return text.replace(re, '$1’$2');
        }
    });
    
    Typograf.addRule({
        name: 'common/punctuation/delDoublePunctuation',
        handler: function(text) {
            return text
                .replace(/(^|[^,]),,(?!,)/g, '$1,')
                .replace(/(^|[^:])::(?!:)/g, '$1:')
                .replace(/(^|[^!?\.])\.\.(?!\.)/g, '$1.')
                .replace(/(^|[^;]);;(?!;)/g, '$1;')
                .replace(/(^|[^?])\?\?(?!\?)/g, '$1?');
        }
    });
    
    Typograf.addRule({
        name: 'common/punctuation/quote',
        handler: function(text, commonSettings) {
            var locale = this._locale[0],
                localeSettings = commonSettings[locale];
    
            if (!localeSettings) { return text; }
    
            var lquote = localeSettings.left[0],
                rquote = localeSettings.right[0],
                lquote2 = localeSettings.left[1] || lquote;
    
            text = this._setQuotes(text, localeSettings);
            if (localeSettings.removeDuplicateQuotes && lquote === lquote2) {
                text = text
                    // ««word» word» -> «word» word»
                    .replace(new RegExp(lquote + lquote, 'g'), lquote)
                    // «word «word»» -> «word «word»
                    .replace(new RegExp(rquote + rquote, 'g'), rquote);
            }
    
            return text;
        },
        settings: function() {
            var settings = {};
    
            Typograf.getLocales().forEach(function(locale) {
                settings[locale] = Typograf.deepCopy(Typograf.getData(locale + '/quote'));
            });
    
            return settings;
        }
    });
    
    Typograf.prototype._setQuotes = function(text, settings) {
        var privateLabel = Typograf._privateLabel,
            lquote = settings.left[0],
            rquote = settings.right[0],
            lquote2 = settings.left[1] || lquote,
            quotes = '[' + Typograf.getData('common/quote') + ']',
            reL = new RegExp('(^|[\\s[(])("{1,3})(?=\\S)', 'gim'),
            reR = new RegExp('(\\S)("{1,3})(?=[!?.:;#*,…)\\s' + privateLabel + ']|$)', 'gim'),
            reQuotes = new RegExp(quotes, 'g'),
            reClosingTag = new RegExp('(' + privateLabel + ')"(?=[^\\s' + privateLabel + ']|$)', 'gm'),
            count = 0;
    
        text = text
            // Hide incorrect quotes.
            .replace(reQuotes, function() {
                count++;
                return '"';
            })
            // Opening quote
            .replace(reL, function($0, $1, $2) { return $1 + Typograf._repeat(lquote, $2.length); })
            // Closing quote
            .replace(reR, function($0, $1, $2) { return $1 + Typograf._repeat(rquote, $2.length); })
            // Tag and closing quote
            .replace(reClosingTag, '$1' + rquote);
    
        if (lquote !== lquote2 && (count % 2) === 0) {
            text = this._setInnerQuotes(text, settings);
        }
    
        return text;
    };
    
    Typograf.prototype._setInnerQuotes = function(text, settings) {
        var leftQuotes = [],
            rightQuotes = [];
    
        for (var k = 0; k < settings.left.length; k++) {
            leftQuotes.push(settings.left[k]);
            rightQuotes.push(settings.right[k]);
        }
    
        var lquote = settings.left[0],
            rquote = settings.right[0],
            bufText = new Array(text.length),
            minLevel = -1,
            maxLevel = leftQuotes.length - 1,
            level = minLevel;
    
        for (var i = 0, len = text.length; i < len; i++) {
            var letter = text[i];
    
            if (letter === lquote) {
                level++;
                if (level > maxLevel) {
                    level = maxLevel;
                }
                bufText.push(leftQuotes[level]);
            } else if (letter === rquote) {
                if (level <= minLevel) {
                    level = 0;
                    bufText.push(leftQuotes[level]);
                } else {
                    bufText.push(rightQuotes[level]);
                    level--;
                    if (level < minLevel) {
                        level = minLevel;
                    }
                }
            } else {
                if (letter === '"') {
                    level = minLevel;
                }
    
                bufText.push(letter);
            }
        }
    
        return bufText.join('');
    };
    
    Typograf.addRule({
        name: 'common/punctuation/quoteLink',
        queue: 'show-safe-tags-html',
        handler: function(text) {
            var quotes = this.getSetting('common/punctuation/quote', this._locale[0]);
    
            if (!quotes) { return text; }
            var entities = Typograf.HtmlEntities,
                lquote1 = entities.getByUtf(quotes.left[0]),
                rquote1 = entities.getByUtf(quotes.right[0]),
                lquote2 = entities.getByUtf(quotes.left[1]),
                rquote2 = entities.getByUtf(quotes.right[1]);
    
            lquote2 = lquote2 ? ('|' + lquote2) : '';
            rquote2 = rquote2 ? ('|' + rquote2) : '';
    
            var re = new RegExp('(<[aA]\\s[^>]*?>)(' + lquote1 + lquote2 + ')([^]*?)(' + rquote1 + rquote2 + ')(</[aA]>)', 'g');
    
            return text.replace(re, '$2$1$3$5$4');
        }
    });
    
    Typograf.addRule({
        name: 'common/space/afterPunctuation',
        handler: function(text) {
            var privateLabel = Typograf._privateLabel,
                reExcl = new RegExp('(!|;|\\?)([^).!;?\\s[\\])' + privateLabel + this.getData('common/quote') + '])', 'g'),
                reComma = new RegExp('(\\D)(,|:)([^)",:.?\\s\\/\\\\' + privateLabel + '])', 'g');
    
            return text
                .replace(reExcl, '$1 $2')
                .replace(reComma, '$1$2 $3');
        }
    });
    
    Typograf.addRule({
        name: 'common/space/beforeBracket',
        handler: function(text) {
            var re = new RegExp('([' + this.getData('char') + '.!?,;…)])\\(', 'gi');
            return text.replace(re, '$1 (');
        }
    });
    
    Typograf.addRule({
        name: 'common/space/bracket',
        handler: function(text) {
            return text
                .replace(/(\() +/g, '(')
                .replace(/ +\)/g, ')');
        }
    });
    
    Typograf.addRule({
        name: 'common/space/delBeforePercent',
        handler: function(text) {
            return text.replace(/(\d)( |\u00A0)(%|‰|‱)/g, '$1$3');
        }
    });
    
    Typograf.addRule({
        name: 'common/space/delBeforePunctuation',
        handler: function(text) {
            return text.replace(/ ([!;,?.:])(?!\))/g, '$1');
        }
    });
    
    Typograf.addRule({
        name: 'common/space/delLeadingBlanks',
        handler: function(text) {
            return text.replace(/\n[ \t]+/g, '\n');
        },
        disabled: true
    });
    
    Typograf.addRule({
        name: 'common/space/delRepeatN',
        index: '-1',
        handler: function(text) {
            return text.replace(/\n{3,}/g, '\n\n');
        }
    });
    
    Typograf.addRule({
        name: 'common/space/delRepeatSpace',
        index: '-1',
        handler: function(text) {
            return text.replace(/([^\n \t])[ \t]{2,}(?![\n \t])/g, '$1 ');
        }
    });
    
    Typograf.addRule({
        name: 'common/space/delTrailingBlanks',
        index: '-3',
        handler: function(text) {
            return text.replace(/[ \t]+\n/g, '\n');
        }
    });
    
    Typograf.addRule({
        name: 'common/space/replaceTab',
        index: '-5',
        handler: function(text) {
            return text.replace(/\t/g, '    ');
        }
    });
    
    Typograf.addRule({
        name: 'common/space/squareBracket',
        handler: function(text) {
            return text
                .replace(/(\[) +/g, '[')
                .replace(/ +\]/g, ']');
        }
    });
    
    Typograf.addRule({
        name: 'common/space/trimLeft',
        index: '-4',
        handler: String.prototype.trimLeft ? function(text) {
            return text.trimLeft();
        } : /* istanbul ignore next */ function(text) {
            return text.replace(/^[\s\uFEFF\xA0]+/g, '');
        }
    });
    
    Typograf.addRule({
        name: 'common/space/trimRight',
        index: '-3',
        live: false,
        handler: String.prototype.trimRight ? function(text) {
            return text.trimRight();
        } : /* istanbul ignore next */ function(text) {
            return text.replace(/[\s\uFEFF\xA0]+$/g, '');
        }
    });
    
    Typograf.addRule({
        name: 'common/symbols/arrow',
        handler: function(text) {
            return Typograf._replace(text, [
                [/(^|[^-])->(?!>)/g, '$1→'],
                [/(^|[^<])<-(?!-)/g, '$1←']
            ]);
        }
    });
    
    Typograf.addRule({
        name: 'common/symbols/cf',
        handler: function(text) {
            var re = new RegExp('(^|[^%])(\\d+)( |\u00A0)?(C|F)([\\W \\.,:!\\?"\\]\\)]|$)', 'g');
    
            return text.replace(re, '$1$2' + '\u2009' + '°$4$5');
        }
    });
    
    Typograf.addRule({
        name: 'common/symbols/copy',
        handler: function(text) {
            return Typograf._replace(text, [
                [/\(r\)/gi, '®'],
                [/(copyright )?\((c|с)\)/gi, '©'],
                [/\(tm\)/gi, '™']
            ]);
        }
    });
    
    Typograf.addRule({
        name: 'ru/dash/centuries',
        handler: function(text, settings) {
            var dashes = '(' + this.getData('common/dash') + ')',
                re = new RegExp('(X|I|V)[ |\u00A0]?' + dashes + '[ |\u00A0]?(X|I|V)', 'g');
    
            return text.replace(re, '$1' + settings.dash + '$3');
        },
        settings: {
            dash: '\u2013' // &ndash;
        }
    });
    
    Typograf.addRule({
        name: 'ru/dash/daysMonth',
        handler: function(text, settings) {
            var re = new RegExp('(^|\\s)([123]?\\d)' +
                    '(' + this.getData('common/dash') + ')' +
                    '([123]?\\d)[ \u00A0]' +
                    '(' + this.getData('ru/monthGenCase') + ')', 'g');
    
            return text.replace(re, '$1$2' + settings.dash + '$4\u00A0$5');
        },
        settings: {
            dash: '\u2013' // &ndash;
        }
    });
    
    Typograf.addRule({
        name: 'ru/dash/de',
        handler: function(text) {
            var re = new RegExp('([a-яё]+) де' + this.getData('ru/dashAfterDe'), 'g');
    
            return text.replace(re, '$1-де');
        },
        disabled: true
    });
    
    Typograf.addRule({
        name: 'ru/dash/decade',
        handler: function(text, settings) {
            var re = new RegExp('(^|\\s)(\\d{3}|\\d)0' +
                    '(' + this.getData('common/dash') + ')' +
                    '(\\d{3}|\\d)0(-е[ \u00A0])' +
                    '(?=г\\.?[ \u00A0]?г|год)', 'g');
    
            return text.replace(re, '$1$20' + settings.dash + '$40$5');
        },
        settings: {
            dash: '\u2013' // &ndash;
        }
    });
    
    Typograf.addRule({
        name: 'ru/dash/directSpeech',
        handler: function(text) {
            var dashes = this.getData('common/dash'),
                re1 = new RegExp('(["»‘“,])[ |\u00A0]?(' + dashes + ')[ |\u00A0]', 'g'),
                re2 = new RegExp('(^|' + Typograf._privateLabel + ')(' + dashes + ')( |\u00A0)', 'gm'),
                re3 = new RegExp('([.…?!])[ \u00A0](' + dashes + ')[ \u00A0]', 'g');
    
            return text
                .replace(re1, '$1\u00A0\u2014 ')
                .replace(re2, '$1\u2014\u00A0')
                .replace(re3, '$1 \u2014\u00A0');
        }
    });
    
    Typograf.addRule({
        name: 'ru/dash/izpod',
        handler: function(text) {
            var re = new RegExp(this.getData('ru/dashBefore') + '(И|и)з под' + this.getData('ru/dashAfter'), 'g');
    
            return text.replace(re, '$1$2з-под');
        }
    });
    
    Typograf.addRule({
        name: 'ru/dash/izza',
        handler: function(text) {
            var re = new RegExp(this.getData('ru/dashBefore') + '(И|и)з за' + this.getData('ru/dashAfter'), 'g');
    
            return text.replace(re, '$1$2з-за');
        }
    });
    
    Typograf.addRule({
        name: 'ru/dash/ka',
        handler: function(text) {
            var re = new RegExp('([a-яё]+) ка(сь)?' + this.getData('ru/dashAfter'), 'g');
    
            return text.replace(re, '$1-ка$2');
        }
    });
    
    Typograf.addRule({
        name: 'ru/dash/koe',
        handler: function(text) {
            var re = new RegExp(this.getData('ru/dashBefore') +
                '([Кк]о[ей])\\s([а-яё]{3,})' +
                this.getData('ru/dashAfter'), 'g');
    
            return text.replace(re, '$1$2-$3');
        }
    });
    
    Typograf.addRule({
        name: 'ru/dash/main',
        index: '-5',
        handler: function(text) {
            var dashes = this.getData('common/dash'),
                re = new RegExp('([ \u00A0])(' + dashes + ')([ \u00A0\\n])', 'g');
    
            return text.replace(re, '\u00A0\u2014$3');
        }
    });
    
    Typograf.addRule({
        name: 'ru/dash/month',
        handler: function(text, settings) {
            var months = '(' + this.getData('ru/month') + ')',
                monthsPre = '(' + this.getData('ru/monthPreCase') + ')',
                dashes = this.getData('common/dash'),
                re = new RegExp(months + ' ?(' + dashes + ') ?' + months, 'gi'),
                rePre = new RegExp(monthsPre + ' ?(' + dashes + ') ?' + monthsPre, 'gi'),
                newSubStr = '$1' + settings.dash + '$3';
    
            return text
                .replace(re, newSubStr)
                .replace(rePre, newSubStr);
        },
        settings: {
            dash: '\u2013' // &ndash;
        }
    });
    
    Typograf.addRule({
        name: 'ru/dash/surname',
        handler: function(text) {
            var re = new RegExp('([А-ЯЁ][а-яё]+)\\s-([а-яё]{1,3})(?![^а-яё]|$)', 'g');
    
            return text.replace(re, '$1\u00A0\u2014$2');
        }
    });
    
    Typograf.addRule({
        name: 'ru/dash/taki',
        handler: function(text) {
            var re = new RegExp('(верно|довольно|опять|прямо|так|вс[её]|действительно|неужели)\\s(таки)' +
                this.getData('ru/dashAfter'), 'g');
    
            return text.replace(re, '$1-$2');
        }
    });
    
    Typograf.addRule({
        name: 'ru/dash/time',
        handler: function(text, settings) {
            var re = new RegExp(this.getData('ru/dashBefore') +
                '(\\d?\\d:[0-5]\\d)' +
                this.getData('common/dash') +
                '(\\d?\\d:[0-5]\\d)' +
                this.getData('ru/dashAfter'), 'g');
    
            return text.replace(re, '$1$2' + settings.dash + '$3');
        },
        settings: {
            dash: '\u2013' // &ndash;
        }
    });
    
    Typograf.addRule({
        name: 'ru/dash/to',
        handler: function(text) {
            var words = [
                    'откуда', 'куда', 'где',
                    'когда', 'зачем', 'почему',
                    'как', 'како[ейм]', 'какая', 'каки[емх]', 'какими', 'какую',
                    'что', 'чего', 'че[йм]', 'чьим?',
                    'кто', 'кого', 'кому', 'кем'
                ],
                re = new RegExp('(' + words.join('|') + ')( | -|- )(то|либо|нибудь)' +
                    this.getData('ru/dashAfter'), 'gi');
    
            return text.replace(re, '$1-$3');
        }
    });
    
    Typograf.addRule({
        name: 'ru/dash/weekday',
        handler: function(text, settings) {
            var part = '(' + this.getData('ru/weekday') + ')',
                re = new RegExp(part + ' ?(' + this.getData('common/dash') + ') ?' + part, 'gi');
    
            return text.replace(re, '$1' + settings.dash + '$3');
        },
        settings: {
            dash: '\u2013' // &ndash;
        }
    });
    
    Typograf.addRule({
        name: 'ru/dash/years',
        handler: function(text, settings) {
            var dashes = this.getData('common/dash'),
                re = new RegExp('(\\D|^)(\\d{4})[ \u00A0]?(' +
                    dashes + ')[ \u00A0]?(\\d{4})(?=[ \u00A0]?г)', 'g');
    
            return text.replace(re, function($0, $1, $2, $3, $4) {
                if (parseInt($2, 10) < parseInt($4, 10)) {
                    return $1 + $2 + settings.dash + $4;
                }
    
                return $0;
            });
        },
        settings: {
            dash: '\u2013' // &ndash;
        }
    });
    
    Typograf.addRule({
        name: 'ru/date/fromISO',
        handler: function(text) {
            var sp1 = '(-|\\.|\\/)',
                sp2 = '(-|\\/)',
                re1 = new RegExp('(^|\\D)(\\d{4})' + sp1 + '(\\d{2})' + sp1 + '(\\d{2})(\\D|$)', 'gi'),
                re2 = new RegExp('(^|\\D)(\\d{2})' + sp2 + '(\\d{2})' + sp2 + '(\\d{4})(\\D|$)', 'gi');
    
            return text
                .replace(re1, '$1$6.$4.$2$7')
                .replace(re2, '$1$4.$2.$6$7');
        }
    });
    
    Typograf.addRule({
        name: 'ru/date/weekday',
        handler: function(text) {
            var space = '( |\u00A0)',
                monthCase = this.getData('ru/monthGenCase'),
                weekday = this.getData('ru/weekday'),
                re = new RegExp('(\\d)' + space + '(' + monthCase + '),' + space + '(' + weekday + ')', 'gi');
    
            return text.replace(re, function() {
                var a = arguments;
                return a[1] + a[2] + a[3].toLowerCase() + ',' + a[4] + a[5].toLowerCase();
            });
        }
    });
    
    Typograf.addRule({
        name: 'ru/money/currency',
        handler: function(text) {
            var currency = '([$€¥Ұ£₤₽])',
                re1 = new RegExp('(^|[\\D]{2})' + currency + ' ?([\\d.,]+([ \u00A0\u2009\u202F]\\d{3})*)', 'g'),
                re2 = new RegExp('(^|[\\D])([\\d.,]+) ?' + currency, 'g'),
                newSubstr1 = '$1$3\u00A0$2',
                newSubstr2 = '$1$2\u00A0$3';
    
            return text
                .replace(re1, newSubstr1)
                .replace(re2, newSubstr2);
        }
    });
    
    Typograf.addRule({
        name: 'ru/money/ruble',
        handler: function(text) {
            var newSubstr = '$1\u00A0₽',
                commonPart = '(\\d+)( |\u00A0)?(р|руб)\\.',
                re1 = new RegExp('^' + commonPart + '$', 'g'),
                re2 = new RegExp(commonPart + '(?=[!?,:;])', 'g'),
                re3 = new RegExp(commonPart + '(?=\\s+[A-ЯЁ])', 'g');
                
            return text
                .replace(re1, newSubstr)
                .replace(re2, newSubstr)
                .replace(re3, newSubstr + '.');
        },
        disabled: true
    });
    
    Typograf.addRule({
        name: 'ru/nbsp/abbr',
        handler: function(text) {
            function abbr($0, $1, $2, $3) {
                // Являются ли сокращения ссылкой
                if (['рф', 'ру', 'рус', 'орг', 'укр', 'бг', 'срб'].indexOf($3) > -1) {
                    return $0;
                }
    
                return $1 + $2 + '.' + '\u00A0' + $3 + '.';
            }
    
            var re = new RegExp('(^|\\s|' + Typograf._privateLabel + ')([а-яё]{1,3})\\. ?([а-яё]{1,3})\\.', 'g');
    
            return text
                .replace(re, abbr)
                // Для тройных сокращений - а.е.м.
                .replace(re, abbr);
        }
    });
    
    Typograf.addRule({
        name: 'ru/nbsp/addr',
        handler: function(text) {
            return text
                .replace(/(\s|^)(дом|д\.|кв\.|под\.|п\-д) *(\d+)/gi, '$1$2\u00A0$3')
                .replace(/(\s|^)(мкр-н|мк-н|мкр\.|мкрн)\s/gi, '$1$2\u00A0') // микрорайон
                .replace(/(\s|^)(эт\.) *(-?\d+)/gi, '$1$2\u00A0$3')
                .replace(/(\s|^)(\d+) +этаж([^а-яё]|$)/gi, '$1$2\u00A0этаж$3')
                .replace(/(\s|^)литер\s([А-Я]|$)/gi, '$1литер\u00A0$2')
                /*
                    область, край, станция, поселок, село,
                    деревня, улица, переулок, проезд, проспект,
                    бульвар, площадь, набережная, шоссе,
                    тупик, офис, комната, участок, владение, строение, корпус
                */
                .replace(/(\s|^)(обл|кр|ст|пос|с|д|ул|пер|пр|пр\-т|просп|пл|бул|б\-р|наб|ш|туп|оф|комн?|уч|вл|влад|стр|кор)\. *([а-яёa-z\d]+)/gi, '$1$2.\u00A0$3')
                // город
                .replace(/(\D[ \u00A0]|^)г\. ?([А-ЯЁ])/gm, '$1г.\u00A0$2');
        }
    });
    
    Typograf.addRule({
        name: 'ru/nbsp/afterNumberSign',
        handler: function(text) {
            // \u2009 - THIN SPACE
            // \u202F - NARROW NO-BREAK SPACE
            return text.replace(/№[ \u00A0\u2009]?(\d|п\/п)/g, '№\u202F$1');
        }
    });
    
    Typograf.addRule({
        name: 'ru/nbsp/beforeParticle',
        index: '+5',
        handler: function(text) {
            var particles = '(ли|ль|же|ж|бы|б)',
                re1 = new RegExp('([А-ЯЁа-яё]) ' + particles + '(?=[,;:?!"‘“»])', 'g'),
                re2 = new RegExp('([А-ЯЁа-яё])[ \u00A0]' + particles + '[ \u00A0]', 'g');
    
            return text
                .replace(re1, '$1\u00A0$2')
                .replace(re2, '$1\u00A0$2 ');
        }
    });
    
    Typograf.addRule({
        name: 'ru/nbsp/centuries',
        handler: function(text) {
            var dashes = this.getData('common/dash'),
                before = '(^|\\s)([VIX]+)',
                after = '(?=[,;:?!"‘“»]|$)',
                re1 = new RegExp(before + '[ \u00A0]?в\\.?' + after, 'gm'),
                re2 = new RegExp(before + '(' + dashes + ')' + '([VIX]+)[ \u00A0]?в\\.?([ \u00A0]?в\\.?)?' + after, 'gm');
    
            return text
                .replace(re1, '$1$2\u00A0в.')
                .replace(re2, '$1$2$3$4\u00A0вв.');
        }
    });
    
    Typograf.addRule({
        name: 'ru/nbsp/dayMonth',
        handler: function(text) {
            var re = new RegExp('(\\d{1,2}) (' + this.getData('ru/shortMonth') + ')', 'gi');
            return text.replace(re, '$1\u00A0$2');
        }
    });
    
    Typograf.addRule({
        name: 'ru/nbsp/groupNumbers',
        handler: function(text) {
            return text.replace(/(^ ?|\D )(\d{1,3}([ \u00A0\u202F\u2009]\d{3})+)(?! ?[\d-])/gm, function($0, $1, $2) {
                return $1 + $2.replace(/\s/g, '\u202F');
            });
        }
    });
    
    Typograf.addRule({
        name: 'ru/nbsp/initials',
        handler: function(text) {
            var spaces = '\u00A0\u202F ', // nbsp, thinsp
                quote = this.getData('ru/quote'),
                re = new RegExp('(^|[' + spaces +
                    quote.left +
                    Typograf._privateLabel +
                    '"])([А-ЯЁ])\\.[' + spaces + ']?([А-ЯЁ])\\.[' + spaces +
                    ']?([А-ЯЁ][а-яё]+)(?=[\\s.,;:?!"' + quote.right + ']|$)', 'gm');
    
            return text.replace(re, '$1$2.\u00A0$3.\u00A0$4');
        }
    });
    
    Typograf.addRule({
        name: 'ru/nbsp/m',
        index: '+5',
        handler: function(text) {
            var label = Typograf._privateLabel,
                re = new RegExp('(^|[\\s,.' + label + '])' +
                    '(\\d+)[ \u00A0]?(мм?|см|км|дм|гм|mm?|km|cm|dm)([23²³])?([\\s.!?,;' +
                    label + ']|$)', 'gm');
    
            return text.replace(re, function($0, $1, $2, $3, $4, $5) {
                var pow = {
                    '2': '²',
                    '²': '²',
                    '3': '³',
                    '³': '³',
                    '': ''
                }[$4 || ''];
    
                return $1 + $2 + '\u00A0' + $3 + pow + ($5 === '\u00A0' ? ' ': $5);
            });
        }
    });
    
    Typograf.addRule({
        name: 'ru/nbsp/ooo',
        handler: function(text) {
            return text.replace(/(^|[^a-яёA-ЯЁ])(ООО|ОАО|ЗАО|НИИ|ПБОЮЛ) /g, '$1$2\u00A0');
        }
    });
    
    Typograf.addRule({
        name: 'ru/nbsp/page',
        handler: function(text) {
            var re = new RegExp('(^|[)\\s' + Typograf._privateLabel + '])' +
                '(стр|гл|рис|илл?|ст|п|c)\\. *(\\d+)([\\s.,?!;:]|$)', 'gim');
    
            return text.replace(re, '$1$2.\u00A0$3$4');
        }
    });
    
    Typograf.addRule({
        name: 'ru/nbsp/ps',
        handler: function(text) {
            var re = new RegExp('(^|\\s|' + Typograf._privateLabel + ')[pз]\\.[ \u00A0]?([pз]\\.[ \u00A0]?)?[sы]\\.:? ', 'gim');
            return text.replace(re, function($0, $1, $2) {
                return $1 + ($2 ? 'P.\u00A0P.\u00A0S. ' : 'P.\u00A0S. ');
            });
        }
    });
    
    Typograf.addRule({
        name: 'ru/nbsp/rubleKopek',
        handler: function(text) {
            return text.replace(/(\d) ?(?=(руб|коп)\.)/g, '$1\u00A0');
        }
    });
    
    Typograf.addRule({
        name: 'ru/nbsp/see',
        handler: function(text) {
            var re = new RegExp('(^|\\s|' + Typograf._privateLabel + '|\\()(см|им)\\.[ \u00A0]?([а-яё0-9a-z]+)([\\s.,?!]|$)', 'gi');
            return text.replace(re, function($0, $1, $2, $3, $4) {
                return ($1 === '\u00A0' ? ' ' : $1) + $2 + '.\u00A0' + $3 + $4;
            });
        }
    });
    
    Typograf.addRule({
        name: 'ru/nbsp/year',
        handler: function(text) {
            return text.replace(/(^|\D)(\d{4}) ?г([ ,;.\n]|$)/g, '$1$2\u00A0г$3');
        }
    });
    
    Typograf.addRule({
        name: 'ru/nbsp/years',
        index: '+5',
        handler: function(text) {
            var dashes = this.getData('common/dash'),
                re = new RegExp('(^|\\D)(\\d{4})(' +
                    dashes + ')(\\d{4})[ \u00A0]?г\\.?([ \u00A0]?г\\.)?(?=[,;:?!"‘“»\\s]|$)', 'gm');
    
            return text.replace(re, '$1$2$3$4\u00A0гг.');
        }
    });
    
    Typograf.addRule({
        name: 'ru/number/comma',
        handler: function(text) {
            // \u00A0 - NO-BREAK SPACE
            // \u2009 - THIN SPACE
            // \u202F - NARROW NO-BREAK SPACE
            return text.replace(/(^|\s)(\d+)\.(\d+[\u00A0\u2009\u202F ]*?[%‰°×x])/gim, '$1$2,$3');
        }
    });
    
    Typograf.addRule({
        name: 'ru/number/ordinals',
        handler: function(text) {
            var re = new RegExp('(\\d[%‰]?)-(ый|ой|ая|ое|ые|ым|ом|ых|ого|ому|ыми)(?![' + this.getData('char') + '])', 'g');
    
            return text.replace(re, function($0, $1, $2) {
                var parts = {
                    'ой': 'й',
                    'ый': 'й',
                    'ая': 'я',
                    'ое': 'е',
                    'ые': 'е',
                    'ым': 'м',
                    'ом': 'м',
                    'ых': 'х',
                    'ого': 'го',
                    'ому': 'му',
                    'ыми': 'ми',
                };
    
                return $1 + '-' + parts[$2];
            });
        }
    });
    
    (function() {
    
        var classNames = [
                'typograf-oa-lbracket',
                'typograf-oa-n-lbracket',
                'typograf-oa-sp-lbracket'
            ],
            name = 'ru/optalign/bracket';
    
        Typograf.addRule({
            name: name,
            handler: function(text) {
                return text
                    .replace(/( |\u00A0)\(/g, '<span class="typograf-oa-sp-lbracket">$1</span><span class="typograf-oa-lbracket">(</span>')
                    .replace(/^\(/gm, '<span class="typograf-oa-n-lbracket">(</span>');
            },
            disabled: true
        }).addInnerRule({
            name: name,
            queue: 'start',
            handler: function(text) {
                return Typograf._removeOptAlignTags(text, classNames);
            }
        }).addInnerRule({
            name: name,
            queue: 'end',
            handler: function(text) {
                return Typograf._removeOptAlignTagsFromTitle(text, classNames);
            }
        });
    
    })();
    
    (function() {
    
        var classNames = [
                'typograf-oa-comma',
                'typograf-oa-comma-sp'
            ],
            name = 'ru/optalign/comma';
    
        Typograf.addRule({
            name: name,
            handler: function(text) {
                var re = new RegExp('([' + this.getData('char') + '\\d\u0301]+), ', 'gi');
                return text.replace(re, '$1<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>');
            },
            disabled: true
        }).addInnerRule({
            name: name,
            queue: 'start',
            handler: function(text) {
                return Typograf._removeOptAlignTags(text, classNames);
            }
        }).addInnerRule({
            name: name,
            queue: 'end',
            handler: function(text) {
                return Typograf._removeOptAlignTagsFromTitle(text, classNames);
            }
        });
    
    })();
    
    Typograf._removeOptAlignTags = function(text, classNames) {
        var re = new RegExp('<span class="(' + classNames.join('|') + ')">([^]*?)</span>', 'g');
        return text.replace(re, '$2');
    };
    
    Typograf._removeOptAlignTagsFromTitle = function(text, classNames) {
        return text.replace(/<title>[^]*?<\/title>/i, function(text) {
            return Typograf._removeOptAlignTags(text, classNames);
        });
    };
    
    (function() {
    
        var classNames = [
                'typograf-oa-lquote',
                'typograf-oa-n-lquote',
                'typograf-oa-sp-lquote'
            ],
            name = 'ru/optalign/quote';
    
        Typograf.addRule({
            name: name,
            handler: function(text) {
                var quote = this.getSetting('common/punctuation/quote', 'ru'),
                    lquotes = '([' + quote.left[0] + (quote.left[1] || '') + '])',
                    reNewLine = new RegExp('(^|\n\n|' + Typograf._privateLabel + ')(' + lquotes + ')', 'g'),
                    reInside = new RegExp('([^\n' + Typograf._privateLabel + '])([ \u00A0\n])(' + lquotes + ')', 'gi');
    
                return text
                    .replace(reNewLine, '$1<span class="typograf-oa-n-lquote">$2</span>')
                    .replace(reInside, '$1<span class="typograf-oa-sp-lquote">$2</span><span class="typograf-oa-lquote">$3</span>');
            },
            disabled: true
        }).addInnerRule({
            name: name,
            queue: 'start',
            handler: function(text) {
                return Typograf._removeOptAlignTags(text, classNames);
            }
        }).addInnerRule({
            name: name,
            queue: 'end',
            handler: function(text) {
                return Typograf._removeOptAlignTagsFromTitle(text, classNames);
            }
        });
    
    })();
    
    Typograf.addRule({
        name: 'ru/other/accent',
        handler: function(text) {
            return text.replace(/([а-яё])([АЕЁИОУЫЭЮЯ])([^А-ЯЁ\w]|$)/g, function($0, $1, $2, $3) {
                return $1 + $2.toLowerCase() + '\u0301' + $3;
            });
        },
        disabled: true
    });
    
    (function() {
    
        var defaultCityCodeLength = 5,
            countryCode = '7',
            exceptions = [],
            exceptionsMax = 8,
            exceptionsMin = 2;
    
        [
            4162, 416332, 8512, 851111, 4722, 4725, 391379, 8442, 4732,
            4152, 4154451, 4154459, 4154455, 41544513, 8142, 8332, 8612,
            8622, 3525, 812, 8342, 8152, 3812, 4862, 3422, 342633, 8112,
            9142, 8452, 3432, 3434, 3435, 4812, 3919, 8432, 8439, 3822,
            4872, 3412, 3511, 3512, 3022, 4112, 4852, 4855, 3852, 3854,
            8182, 818, 90, 3472, 4741, 4764, 4832, 4922, 8172, 8202, 8722,
            4932, 493, 3952, 3951, 3953, 411533, 4842, 3842, 3843, 8212,
            4942, 3912, 4712, 4742, 8362, 495, 499, 4966, 4964, 4967, 498,
            8312, 8313, 3832, 383612, 3532, 8412, 4232, 423370, 423630, 8632,
            8642, 8482, 4242, 8672, 8652, 4752, 4822, 482502, 4826300, 3452,
            8422, 4212, 3466, 3462, 8712, 8352,
            '901-934', '936-939', '950-953', 958, '960-969',
            '977-989', '991-997', 999
        ].forEach(function(num) {
            if (typeof num === 'string') {
                var buf = num.split('-');
                for (var i = +buf[0]; i <= +buf[1]; i++) {
                    exceptions.push(i);
                }
            } else {
                exceptions.push(num);
            }
        });
    
        function phone(num) {
            var cityCode = '',
                firstSym = num[0],
                hasPlusWithCode,
                hasEight;
    
            if (num.length < 8) {
                return phoneBlocks(num);
            }
    
            // 8 495 123-45-67, +7 495 123-45-67
            if (num.length > 10) {
                if (firstSym === '+') {
                    if (num[1] === countryCode) {
                        hasPlusWithCode = true;
                        num = num.substr(2);
                    } else {
                        return num;
                    }
                } else if (firstSym === '8') {
                    hasEight = true;
                    num = num.substr(1);
                }
            }
    
            for (var cityCodeLen = exceptionsMax; cityCodeLen >= exceptionsMin; cityCodeLen--) {
                var code = +num.substr(0, cityCodeLen);
                if (exceptions.indexOf(code) > -1) {
                    cityCode = num.substr(0, cityCodeLen);
                    num = num.substr(cityCodeLen);
                    break;
                }
            }
    
            if (!cityCode) {
                cityCode = num.substr(0, defaultCityCodeLength);
                num = num.substr(defaultCityCodeLength);
            }
    
            return (hasPlusWithCode ? '+' + countryCode + '\u00A0' : '') +
                (hasEight ? '8\u00A0' : '') +
                prepareCode(cityCode) + '\u00A0' +
                phoneBlocks(num);
        }
    
        function prepareCode(code) {
            var numCode = +code,
              len = code.length,
              result = [code],
              withoutBrackets = false;
    
            if (len > 3) {
                switch (len) {
                    case 4:
                        result = [code.substr(0, 2), code.substr(2, 2)];
                        break;
                    case 5:
                        result = [code.substr(0, 3), code.substr(3, 3)];
                        break;
                    case 6:
                        result = [code.substr(0, 2), code.substr(2, 2), code.substr(4, 2)];
                        break;
                }
            } else {
                // Мобильные и московские номера без скобок
                withoutBrackets = (numCode > 900 && numCode <= 999) || numCode === 495 || numCode === 499;
            }
    
            result = result.join('-');
    
            return withoutBrackets ? result : '(' + result + ')';
        }
    
        function phoneBlocks(num){
            var add = '';
            if (num.length % 2) {
                add = num[0];
                add += num.length <= 5 ? '-': '';
                num = num.substr(1, num.length - 1);
            }
    
            return add + num.split(/(?=(?:\d\d)+$)/).join('-');
        }
    
        function clearPhone(text) {
            return text.replace(/[^\d\+]/g, '');
        }
    
        Typograf.addRule({
            name: 'ru/other/phone-number',
            live: false,
            handler: function(text) {
                var tag = Typograf._privateLabel,
                    re = new RegExp('(^|,| |' + tag + ')(\\+7[\\d\\(\\) \u00A0-]{10,18})(?=,|;|' + tag + '|$)', 'gm');
    
                return text
                    .replace(re, function($0, $1, $2) {
                        var buf = clearPhone($2);
                        return buf.length === 12 ? $1 + phone(buf) : $0;
                    })
                    .replace(
                        /(^|[^а-яё])(т\.|тел\.|ф\.|моб\.|факс|сотовый|мобильный|телефон)(\:?\s*?)([\+\d\(][\d \u00A0\-\(\)]{3,}\d)/gi,
                        function($0, $1, $2, $3, $4) {
                            var buf = clearPhone($4);
                            if (buf.length >= 5) {
                                return $1 + $2 + $3 + phone(buf);
                            }
    
                            return $0;
                        }
                    );
            }
        });
    
    })();
    
    Typograf.addRule({
        name: 'ru/punctuation/ano',
        handler: function(text) {
            var re = new RegExp('([^!?,:;\\-‒–—])([ \u00A0\\n])(а|но)(?= |\u00A0|\\n)', 'g');
            return text.replace(re, '$1,$2$3');
        }
    });
    
    Typograf.addRule({
        name: 'ru/punctuation/exclamation',
        live: false,
        handler: function(text) {
            return text
                .replace(/(^|[^!])!{2}($|[^!])/, '$1!$2')
                .replace(/(^|[^!])!{4}($|[^!])/, '$1!!!$2');
        }
    });
    
    Typograf.addRule({
        name: 'ru/punctuation/exclamationQuestion',
        index: '+5',
        handler: function(text) {
            var re = new RegExp('(^|[^!])!\\?([^?]|$)', 'g');
            return text.replace(re, '$1?!$2');
        }
    });
    
    Typograf.addRule({
        name: 'ru/punctuation/hellip',
        handler: function(text) {
            return text
                .replace(/(^|[^.])\.{3,4}([^.]|$)/g, '$1…$2')
                .replace(/(^|[^.])(\.\.\.|…),/g, '$1…')
                .replace(/(\!|\?)(\.\.\.|…)([^.]|$)/g, '$1..$3');
        }
    });
    
    Typograf.addRule({
        name: 'ru/space/afterHellip',
        handler: function(text) {
            return text
                .replace(/([а-яё])(\.\.\.|…)([А-ЯЁ])/g, '$1$2 $3')
                .replace(/([?!]\.\.)([а-яёa-z])/gi, '$1 $2');
        }
    });
    
    Typograf.addRule({
        name: 'ru/space/year',
        handler: function(text) {
            var re = new RegExp('(^| |\u00A0)(\\d{3,4})(год([ауе]|ом)?)([^' +
                this.getData('char') + ']|$)', 'g');
            return text.replace(re, '$1$2 $3$5');
        }
    });
    
    Typograf.addRule({
        name: 'ru/symbols/NN',
        handler: function(text) {
            return text.replace(/№№/g, '№');
        }
    });
    
    (function() {
    
        var replacements = {
            A: 'А', // Latin: Russian
            a: 'а',
            B: 'В',
            E: 'Е',
            e: 'е',
            K: 'К',
            M: 'М',
            H: 'Н',
            O: 'О',
            o: 'о',
            P: 'Р',
            p: 'р',
            C: 'С',
            c: 'с',
            T: 'Т',
            y: 'у',
            X: 'Х',
            x: 'х'
        };
    
        var keys = Object.keys(replacements).join('');
    
        Typograf.addRule({
            name: 'ru/typo/switchingKeyboardLayout',
            handler: function(text) {
                var re = new RegExp('([' + keys + ']{1,3})(?=[А-ЯЁа-яё]+?)', 'g');
    
                return text.replace(re, function(str, $1) {
                    var result = '';
                    for (var i = 0; i < $1.length; i++) {
                        result += replacements[$1[i]];
                    }
    
                    return result;
                });
            }
        });
    
    })();
    

    return Typograf;
}));

Typograf.titles = {
  "common/html/e-mail": {
    "en-US": "Placement of links for e-mail",
    "ru": "Расстановка ссылок для эл. почты"
  },
  "common/html/escape": {
    "en-US": "Escaping HTML",
    "ru": "Экранирование HTML"
  },
  "common/html/nbr": {
    "en-US": "Replacement line break on <br/>",
    "ru": "Замена перевода строки на <br/>"
  },
  "common/html/p": {
    "en-US": "Placement of paragraph",
    "ru": "Расстановка абзацев"
  },
  "common/html/stripTags": {
    "en-US": "Removing HTML-tags",
    "ru": "Удаление HTML-тегов"
  },
  "common/html/url": {
    "en-US": "Placement of links",
    "ru": "Расстановка ссылок"
  },
  "common/nbsp/afterNumber": {
    "en-US": "Non-breaking space between number and word",
    "ru": "Нераз. пробел между числом и словом"
  },
  "common/nbsp/afterParagraph": {
    "en-US": "Non-breaking thin space after §",
    "ru": "Нераз. узкий пробел после §"
  },
  "common/nbsp/afterShortWord": {
    "en-US": "Non-breaking space after short word",
    "ru": "Нераз. пробел после короткого слова"
  },
  "common/nbsp/beforeShortLastNumber": {
    "en-US": "Non-breaking space before number (maximum 2 digits) at end of sentence",
    "ru": "Нераз. пробел перед числом (не более 2 цифр) в конце предложения"
  },
  "common/nbsp/beforeShortLastWord": {
    "en-US": "Non-breaking space before last short word in sentence",
    "ru": "Нераз. пробел перед последним коротким словом в предложении"
  },
  "common/nbsp/dpi": {
    "en-US": "Non-breaking space before lpi and dpi",
    "ru": "Нераз. пробел перед lpi и dpi"
  },
  "common/nbsp/nowrap": {
    "en-US": "Replace non-breaking space to normal space in tags nowrap and nobr",
    "ru": "Заменять нераз. пробел на обычный пробел в тегах nowrap и nobr"
  },
  "common/nbsp/replaceNbsp": {
    "en-US": "Replacing non-breaking space in the ordinary",
    "ru": "Замена неразрывного пробела на обычный"
  },
  "common/number/fraction": {
    "common": "1/2 → ½, 1/4 → ¼, 3/4 → ¾"
  },
  "common/number/mathSigns": {
    "common": "!= → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ±"
  },
  "common/number/times": {
    "common": "x → × (10 x 5 → 10×5)"
  },
  "common/other/delBOM": {
    "en-US": "Delete character BOM (Byte Order Mark)",
    "ru": "Удаление символа BOM (Byte Order Mark)"
  },
  "common/other/repeatWord": {
    "en-US": "Removing repeat words",
    "ru": "Удаление повтора слова"
  },
  "common/punctuation/apostrophe": {
    "en-US": "Placement of correct apostrophe",
    "ru": "Расстановка правильного апострофа"
  },
  "common/punctuation/delDoublePunctuation": {
    "en-US": "Removing double punctuation",
    "ru": "Удаление двойной пунктуации"
  },
  "common/punctuation/quote": {
    "en-US": "Placement of quotation marks in texts",
    "ru": "Расстановка кавычек в текстах"
  },
  "common/punctuation/quoteLink": {
    "en-US": "Removal quotes outside a link",
    "ru": "Вынос кавычек за пределы ссылки"
  },
  "common/space/afterPunctuation": {
    "en-US": "space after punctuation",
    "ru": "Пробел после знаков пунктуации"
  },
  "common/space/beforeBracket": {
    "en-US": "Space before opening bracket",
    "ru": "Пробел перед открывающей скобкой"
  },
  "common/space/bracket": {
    "en-US": "Remove extra spaces after opening and before closing bracket",
    "ru": "Удаление лишних пробелов после открывающей и перед закрывающей скобки"
  },
  "common/space/delBeforePercent": {
    "en-US": "Remove space before %, ‰ and ‱",
    "ru": "Удаление пробела перед %, ‰ и ‱"
  },
  "common/space/delBeforePunctuation": {
    "en-US": "Remove spaces before punctuation",
    "ru": "Удаление пробелов перед знаками пунктуации"
  },
  "common/space/delLeadingBlanks": {
    "en-US": "Remove spaces at start of line",
    "ru": "Удаление пробелов в начале строки"
  },
  "common/space/delRepeatN": {
    "en-US": "Remove duplicate line breaks (three or more)",
    "ru": "Удаление повторяющихся переносов строки (от трёх и более)"
  },
  "common/space/delRepeatSpace": {
    "en-US": "Removing duplicate spaces between characters",
    "ru": "Удаление повторяющихся пробелов между символами"
  },
  "common/space/delTrailingBlanks": {
    "en-US": "Remove spaces at end of line",
    "ru": "Удаление пробелов в конце строки"
  },
  "common/space/replaceTab": {
    "en-US": "Replacement of tab to 4 spaces",
    "ru": "Замена таба на 4 пробела"
  },
  "common/space/squareBracket": {
    "en-US": "Remove extra spaces after opening and before closing square bracket",
    "ru": "Удаление лишних пробелов после открывающей и перед закрывающей квадратной скобки"
  },
  "common/space/trimLeft": {
    "en-US": "Remove spaces and line breaks in beginning of text",
    "ru": "Удаление пробелов и переносов строк в начале текста"
  },
  "common/space/trimRight": {
    "en-US": "Remove spaces and line breaks at end of text",
    "ru": "Удаление пробелов и переносов строк в конце текста"
  },
  "common/symbols/arrow": {
    "common": "-> → →, <- → ←"
  },
  "common/symbols/cf": {
    "en-US": "Adding ° to C and F",
    "ru": "Добавление ° к C и F"
  },
  "common/symbols/copy": {
    "common": "(c) → ©, (tm) → ™, (r) → ®"
  },
  "ru/dash/centuries": {
    "en-US": "Hyphen to dash in centuries",
    "ru": "Замена дефиса на тире в веках"
  },
  "ru/dash/daysMonth": {
    "en-US": "Dash between days of one month",
    "ru": "Тире между днями одного месяца"
  },
  "ru/dash/de": {
    "en-US": "Hyphen before “де”",
    "ru": "Дефис перед «де»"
  },
  "ru/dash/decade": {
    "en-US": "Dash in decade",
    "ru": "Тире в десятилетиях, 80—90-е гг."
  },
  "ru/dash/directSpeech": {
    "en-US": "Dash in direct speech",
    "ru": "Тире в прямой речи"
  },
  "ru/dash/izpod": {
    "en-US": "Hyphen between “из-под”",
    "ru": "Дефис между «из-под»"
  },
  "ru/dash/izza": {
    "en-US": "Hyphen between “из-за”",
    "ru": "Дефис между «из-за»"
  },
  "ru/dash/ka": {
    "en-US": "Hyphen before “ка” and “кась”",
    "ru": "Дефис перед «ка» и «кась»"
  },
  "ru/dash/koe": {
    "en-US": "Hyphen after “кое” and “кой”",
    "ru": "Дефис после «кое» и «кой»"
  },
  "ru/dash/main": {
    "en-US": "Replacement hyphen with dash",
    "ru": "Замена дефиса на тире"
  },
  "ru/dash/month": {
    "en-US": "Dash between months",
    "ru": "Тире между месяцами"
  },
  "ru/dash/surname": {
    "en-US": "Acronyms with a dash",
    "ru": "Сокращения с помощью тире"
  },
  "ru/dash/taki": {
    "en-US": "Hyphen between “верно-таки” and etc.",
    "ru": "Дефис между «верно-таки» и т. д."
  },
  "ru/dash/time": {
    "en-US": "Dash in time intervals",
    "ru": "Тире в интервалах времени"
  },
  "ru/dash/to": {
    "en-US": "Hyphen before “то”, “либо”, “нибудь”",
    "ru": "Дефис перед «то», «либо», «нибудь»"
  },
  "ru/dash/weekday": {
    "en-US": "Dash between the days of the week",
    "ru": "Тире между днями недели"
  },
  "ru/dash/years": {
    "en-US": "Hyphen to dash in years",
    "ru": "Замена дефиса на тире в годах"
  },
  "ru/date/fromISO": {
    "en-US": "Converting dates YYYY-MM-DD type DD.MM.YYYY",
    "ru": "Преобразование дат YYYY-MM-DD к виду DD.MM.YYYY"
  },
  "ru/date/weekday": {
    "common": "2 Мая, Понедельник → 2 мая, понедельник"
  },
  "ru/money/currency": {
    "en-US": "Currency symbol ($, €, ¥, Ұ, £ and ₤) after the number, $100 → 100 $",
    "ru": "Символ валюты ($, €, ¥, Ұ, £ и ₤) после числа, $100 → 100 $"
  },
  "ru/money/ruble": {
    "common": "1 руб. → 1 ₽"
  },
  "ru/nbsp/abbr": {
    "en-US": "Non-breaking space in abbreviations, e.g. “т. д.”",
    "ru": "Нераз. пробел в сокращениях, например, в «т. д.»"
  },
  "ru/nbsp/addr": {
    "en-US": "Placement of non-breaking space after “г.”, “обл.”, “ул.”, “пр.”, “кв.” et al.",
    "ru": "Расстановка неразрывного пробела после «г.», «обл.», «ул.», «пр.», «кв.» и др."
  },
  "ru/nbsp/afterNumberSign": {
    "en-US": "Non-breaking thin space after №",
    "ru": "Нераз. узкий пробел после №"
  },
  "ru/nbsp/beforeParticle": {
    "en-US": "Non-breaking space before “ли”, “ль”, “же”, “бы”, “б”",
    "ru": "Нераз. пробел перед «ли», «ль», «же», «бы», «б»"
  },
  "ru/nbsp/centuries": {
    "en-US": "Remove spaces and extra points in “вв.”",
    "ru": "Удаление пробелов и лишних точек в «вв.»"
  },
  "ru/nbsp/dayMonth": {
    "en-US": "Non-breaking space between number and month",
    "ru": "Нераз. пробел между числом и месяцем"
  },
  "ru/nbsp/groupNumbers": {
    "en-US": "Replacement space on a narrow non-breaking space in groups of numbers",
    "ru": "Замена пробела на неразрывный узкий пробел в группах чисел"
  },
  "ru/nbsp/initials": {
    "en-US": "Binding of initials to the name",
    "ru": "Привязка инициалов к фамилии"
  },
  "ru/nbsp/m": {
    "en-US": "m2 → м², m3 → м³ and non-breaking space",
    "ru": "м2 → м², м3 → м³ и нераз. пробел"
  },
  "ru/nbsp/ooo": {
    "en-US": "Non-breaking space after “OOO, ОАО, ЗАО, НИИ, ПБОЮЛ”",
    "ru": "Нераз. пробел после OOO, ОАО, ЗАО, НИИ и ПБОЮЛ"
  },
  "ru/nbsp/page": {
    "en-US": "Non-breaking space after “стр.”, “гл.”, “рис.”, “илл.”",
    "ru": "Нераз. пробел после «стр.», «гл.», «рис.», «илл.»"
  },
  "ru/nbsp/ps": {
    "en-US": "Non-breaking space in P. S. and P. P. S.",
    "ru": "Нераз. пробел в P. S. и P. P. S."
  },
  "ru/nbsp/rubleKopek": {
    "en-US": "Not once. space before the “rub” and “cop.”",
    "ru": "Нераз. пробел перед «руб.» и «коп.»"
  },
  "ru/nbsp/see": {
    "en-US": "Non-breaking space after abbreviation «см.» and «им.»",
    "ru": "Нераз. пробел после сокращений «см.» и «им.»"
  },
  "ru/nbsp/year": {
    "en-US": "Non-breaking space before XXXX г. (2012 г.)",
    "ru": "Нераз. пробел после XXXX г. (2012 г.)"
  },
  "ru/nbsp/years": {
    "en-US": "г.г. → гг. and non-breaking space",
    "ru": "г.г. → гг. и нераз. пробел"
  },
  "ru/number/comma": {
    "en-US": "Commas in numbers",
    "ru": "Замена точки на запятую в числах"
  },
  "ru/number/ordinals": {
    "common": "N-ый, -ой, -ая, -ое, -ые, -ым, -ом, -ых → N-й, -я, -е, -м, -х (25-й)"
  },
  "ru/optalign/bracket": {
    "en-US": "for opening bracket",
    "ru": "для открывающей скобки"
  },
  "ru/optalign/comma": {
    "en-US": "for comma",
    "ru": "для запятой"
  },
  "ru/optalign/quote": {
    "en-US": "for opening quotation marks",
    "ru": "для открывающей кавычки"
  },
  "ru/other/accent": {
    "en-US": "Replacement capital letters to lowercase with addition of accent",
    "ru": "Замена заглавной буквы на строчную с добавлением ударения"
  },
  "ru/other/phone-number": {
    "en-US": "Formatting phone numbers",
    "ru": "Форматирование телефонных номеров"
  },
  "ru/punctuation/ano": {
    "en-US": "Placement of commas before “а” and “но”",
    "ru": "Расстановка запятых перед «а» и «но»"
  },
  "ru/punctuation/exclamation": {
    "common": "!! → !"
  },
  "ru/punctuation/exclamationQuestion": {
    "common": "!? → ?!"
  },
  "ru/punctuation/hellip": {
    "en-US": "Three points on ellipsis",
    "ru": "Три точки на многоточие, ?... → ?.. и пр."
  },
  "ru/space/afterHellip": {
    "en-US": "Space after ..., !.. and ?..",
    "ru": "Пробел после ..., !.. и ?.."
  },
  "ru/space/year": {
    "en-US": "Space between number and word “год”",
    "ru": "Пробел между числом и словом «год»"
  },
  "ru/symbols/NN": {
    "common": "№№ → №"
  },
  "ru/typo/switchingKeyboardLayout": {
    "en-US": "Replacement of Latin letters in Russian. Typos occur when you switch keyboard layouts",
    "ru": "Замена латинских букв на русские. Опечатки, возникающие при переключении клавиатурной раскладки"
  }
};

Typograf.groups = [
  {
    "name": "punctuation",
    "title": {
      "en-US": "Punctuation",
      "ru": "Пунктуация"
    }
  },
  {
    "name": "optalign",
    "title": {
      "en-US": "Hanging punctuation",
      "ru": "Висячая пунктуация"
    }
  },
  {
    "name": "dash",
    "title": {
      "en-US": "Dash and hyphen",
      "ru": "Тире и дефис"
    }
  },
  {
    "name": "nbsp",
    "title": {
      "en-US": "Non-breaking space",
      "ru": "Неразрывный пробел"
    }
  },
  {
    "name": "space",
    "title": {
      "en-US": "Space",
      "ru": "Пробел"
    }
  },
  {
    "name": "html",
    "title": {
      "en-US": "HTML",
      "ru": "HTML"
    }
  },
  {
    "name": "date",
    "title": {
      "en-US": "Date",
      "ru": "Дата"
    }
  },
  {
    "name": "money",
    "title": {
      "en-US": "Money",
      "ru": "Деньги"
    }
  },
  {
    "name": "number",
    "title": {
      "en-US": "Numbers and mathematical expressions",
      "ru": "Числа и математические выражения"
    }
  },
  {
    "name": "symbols",
    "title": {
      "en-US": "Symbols and signs",
      "ru": "Символы и знаки"
    }
  },
  {
    "name": "typo",
    "title": {
      "en-US": "Typos",
      "ru": "Опечатки"
    }
  },
  {
    "name": "other",
    "title": {
      "en-US": "Other",
      "ru": "Прочее"
    }
  }
];
