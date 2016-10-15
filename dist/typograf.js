/*! Typograf | © 2015 Denis Seleznev | https://github.com/typograf/typograf/ */

(function(root, factory) {
if(typeof define === 'function' && define.amd) {
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
 * @param {string} [prefs.lang] Language rules
 * @param {string} [prefs.mode] HTML entities as: 'default' - UTF-8, 'digit' - &#160;, 'name' - &nbsp;
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
            mode = typeof prefs.mode === 'undefined' ? this._prefs.mode : prefs.mode,
            executeRulesForQueue = function(queue) {
                text = that._executeRules(text, rulesForQueue[queue], innerRulesForQueue[queue]);
            };

        this._lang = prefs.lang || this._prefs.lang || 'common';

        text = this._fixLineEnd(text);

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

        text = this._modification(text, mode);
        executeRulesForQueue('entity');

        text = this._showSafeTags(text);

        executeRulesForQueue('end');

        this._lang = null;
        this._isHTML = null;

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
    _fixLineEnd: function(text) {
        return text.replace(/\r\n/g, '\n'); // Windows
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

Typograf.version = '5.5.3';

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

Typograf.prototype.entities = [];

// http://www.w3.org/TR/html4/sgml/entities
[
    ['nbsp', 160],
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
    ['shy', 173],
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
    ['ensp', 8194],
    ['emsp', 8195],
    ['thinsp', 8201],
    ['zwnj', 8204],
    ['zwj', 8205],
    ['lrm', 8206],
    ['rlm', 8207],
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
].forEach(function(en) {
    var name = en[0],
        num = en[1],
        sym = String.fromCharCode(num),
        buf = [
            '&' + name + ';', // 0 - &nbsp;
            '&#' + num + ';', // 1 - &#160;
            sym, // 2 - \u00A0
            new RegExp('&' + name + ';', 'g'),
            new RegExp(sym, 'g') // 4
        ];

    Typograf.prototype.entities.push(buf);
}, this);

Typograf.data('common/dash', '--?|‒|–|—'); // --, &#8210, &ndash, &mdash

Typograf.data('common/quote', '«‹»›„‚“‟‘‛”’"');

Typograf.data({
    'en/l': 'a-z',
    'en/ld': 'a-z\\d',
    'en/L': 'A-Z',
    'en/Ld': 'A-Z\\d',
    'en/lL': 'a-zA-Z',
    'en/lLd': 'a-zA-Z\\d'
});

Typograf.data('en/lquote', '“‘');

Typograf.data('en/rquote', '”’');

Typograf.data({
    'ru/dashBefore': '(^| |\\n)',
    'ru/dashAfter': '(?=[\u00A0 ,.?:!]|$)',
    'ru/dashAfterDe': '(?=[,.?:!]|[\u00A0 ][^А-ЯЁ]|$)'
});

Typograf.data({
    'ru/l': 'а-яёa-z',
    'ru/ld': 'а-яёa-z\\d',
    'ru/L': 'А-ЯЁA-Z',
    'ru/Ld': 'А-ЯЁA-Z\\d',
    'ru/lL': 'а-яёА-ЯЁa-zA-Z',
    'ru/lLd': 'а-яёА-ЯЁa-zA-Z\\d'
});

Typograf.data('ru/lquote', '«„‚');

Typograf.data({
    'ru/month': 'январь|февраль|март|апрель|май|июнь|июль|август|сентябрь|октябрь|ноябрь|декабрь',
    'ru/monthGenCase': 'января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря',
    'ru/monthPreCase': 'январе|феврале|марте|апреле|мае|июне|июле|августе|сентябре|октябре|ноябре|декабре',
    'ru/shortMonth': 'янв|фев|мар|апр|ма[ейя]|июн|июл|авг|сен|окт|ноя|дек'
});

Typograf.data('ru/rquote', '»“‘');

Typograf.data('ru/weekday', 'понедельник|вторник|среда|четверг|пятница|суббота|воскресенье');

Typograf.rule({
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

Typograf.rule({
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

Typograf.rule({
    name: 'common/html/nbr',
    index: '+5',
    queue: 'end',
    handler: function(text) {
        return text.search(/<br/) === -1 ? text.replace(/\n/g, '<br/>\n') : text;
    },
    disabled: true
});

Typograf.rule({
    name: 'common/html/pbr',
    queue: 'end',
    handler: function(text) {
        if (text.search(/<(p|br)[\s\/>]/) === -1) {
            if (text.search(/\n/) === -1) {
                text = '<p>' + text + '</p>';
            } else {
                text = '<p>' + text.replace(/\n\n/g, '</p>\n<p>') + '<\/p>';
                text = text.replace(/([^>])\n/g, '$1<br/>\n');
            }
        }

        return text;
    },
    disabled: true
});

Typograf.rule({
    name: 'common/html/stripTags',
    index: '+99',
    queue: 'end',
    handler: function(text) {
        return text.replace(/<[^>]+>/g, '');
    },
    disabled: true
});

Typograf.rule({
    name: 'common/html/url',
    queue: 'end',
    handler: function(text) {
        return this._isHTML ? text : text.replace(this._reUrl, function($0, protocol, path) {
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

Typograf.rule({
    name: 'common/number/fraction',
    handler: function(text) {
        return text.replace(/(^|\D)1\/2(\D|$)/g, '$1½$2')
            .replace(/(^|\D)1\/4(\D|$)/g, '$1¼$2')
            .replace(/(^|\D)3\/4(\D|$)/g, '$1¾$2');
    }
});

Typograf.rule({
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

Typograf.rule({
    name: 'common/number/times',
    handler: function(text) {
        return text.replace(/(\d)[ \u00A0]?[xх][ \u00A0]?(\d)/g, '$1×$2');
    }
});

Typograf.rule({
    name: 'common/nbsp/afterNumber',
    handler: function(text) {
        var re = '(^|\\D)(\\d{1,5}) ([' +
            this.data('l') +
            ']{2,})';

        return text.replace(new RegExp(re, 'gi'), '$1$2\u00A0$3');
    },
    disabled: true
});

Typograf.rule({
    name: 'common/nbsp/afterParagraph',
    handler: function(text) {
        // \u2009 - THIN SPACE
        // \u202F - NARROW NO-BREAK SPACE
        return text.replace(/\u00A7[ \u00A0\u2009]?(\d|I|V|X)/g, '\u00A7\u202F$1');
    }
});

Typograf.rule({
    name: 'common/nbsp/afterShortWord',
    handler: function(text, settings) {
        var len = settings.lengthShortWord,
            before = ' \u00A0(' + Typograf._privateLabel + this.data('common/quote'),
            subStr = '(^|[' + before + '])([' + this.data('l') + ']{1,' + len + '}) ',
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

Typograf.rule({
    name: 'common/nbsp/beforeShortLastNumber',
    handler: function(text, settings) {
        var re = new RegExp('([' + this.data('lL') +
            ']) (?=\\d{1,' + settings.lengthLastNumber +
            '}[-+−%\'"' + this.data('rquote') + ']?([.!?…]( [' +
            this.data('L') + ']|$)|$))', 'gm');

        return text.replace(re, '$1\u00A0');
    },
    live: false,
    settings: {
        lengthLastNumber: 2
    }
});

Typograf.rule({
    name: 'common/nbsp/beforeShortLastWord',
    handler: function(text, settings) {
        var re = new RegExp('([' + this.data('ld') + ']) ([' +
                this.data('lL') + ']{1,' + settings.lengthLastWord +
                '}[.!?…])( [' + this.data('L') + ']|$)', 'g');
        return text.replace(re, '$1\u00A0$2$3');
    },
    settings: {
        lengthLastWord: 3
    }
});

Typograf.rule({
    name: 'common/nbsp/dpi',
    handler: function(text) {
        return text.replace(/(\d) ?(lpi|dpi)(?!\w)/, '$1\u00A0$2');
    }
});

(function() {

function replaceNbsp($0, $1, $2, $3) {
    return $1 + $2.replace(/([^\u00A0])\u00A0([^\u00A0])/g, '$1 $2') + $3;
}

Typograf.rule({
    name: 'common/nbsp/nowrap',
    queue: 'end',
    handler: function(text) {
        return text
            .replace(/(<nowrap>)(.*?)(<\/nowrap>)/g, replaceNbsp)
            .replace(/(<nobr>)(.*?)(<\/nobr>)/g, replaceNbsp);
    }
});

})();

Typograf.rule({
    name: 'common/nbsp/replaceNbsp',
    queue: 'utf',
    live: false,
    handler: Typograf._replaceNbsp,
    disabled: true
});

Typograf.rule({
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

Typograf.rule({
    name: 'common/other/repeatWord',
    handler: function(text, settings) {
        var punc = '[;:,.?! \n' + this.data('common/quote') + ']';
        var re = new RegExp('(' + punc + '|^)' + 
            '([' + this.data('l') + ']{' + settings.min + ',}) ' + 
            '\\2(' + punc + '|$)', 'gi');

        return text.replace(re, '$1$2$3');
    },
    settings: {min: 2},
    disabled: true
});

Typograf.rule({
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

Typograf.rule({
    name: 'common/space/afterPunctuation',
    handler: function(text) {
        var privateLabel = Typograf._privateLabel,
            reExcl = new RegExp('(!|;|\\?)([^).!;?\\s[\\])' + privateLabel + this.data('common/quote') + '])', 'g'),
            reComma = new RegExp('(\\D)(,|:)([^)",:.?\\s\\/\\\\' + privateLabel + '])', 'g');

        return text
            .replace(reExcl, '$1 $2')
            .replace(reComma, '$1$2 $3');
    }
});

Typograf.rule({
    name: 'common/space/beforeBracket',
    handler: function(text) {
        var re = new RegExp('([' + this.data('l') + '.!?,;…)])\\(', 'gi');
        return text.replace(re, '$1 (');
    }
});

Typograf.rule({
    name: 'common/space/bracket',
    handler: function(text) {
        return text
            .replace(/(\() +/g, '(')
            .replace(/ +\)/g, ')');
    }
});

Typograf.rule({
    name: 'common/space/delBeforePercent',
    handler: function(text) {
        return text.replace(/(\d)( |\u00A0)(%|‰|‱)/g, '$1$3');
    }
});

Typograf.rule({
    name: 'common/space/delBeforePunctuation',
    handler: function(text) {
        return text.replace(/ ([!;,?.:])(?!\))/g, '$1');
    }
});

Typograf.rule({
    name: 'common/space/delLeadingBlanks',
    handler: function(text) {
        return text.replace(/\n[ \t]+/g, '\n');
    },
    disabled: true
});

Typograf.rule({
    name: 'common/space/delRepeatN',
    index: '-1',
    handler: function(text) {
        return text.replace(/\n{3,}/g, '\n\n');
    }
});

Typograf.rule({
    name: 'common/space/delRepeatSpace',
    index: '-1',
    handler: function(text) {
        return text.replace(/([^\n \t])[ \t]{2,}(?![\n \t])/g, '$1 ');
    }
});

Typograf.rule({
    name: 'common/space/delTrailingBlanks',
    index: '-3',
    handler: function(text) {
        return text.replace(/[ \t]+\n/g, '\n');
    }
});

Typograf.rule({
    name: 'common/space/replaceTab',
    index: '-5',
    handler: function(text) {
        return text.replace(/\t/g, '    ');
    }
});

Typograf.rule({
    name: 'common/space/squareBracket',
    handler: function(text) {
        return text
            .replace(/(\[) +/g, '[')
            .replace(/ +\]/g, ']');
    }
});

Typograf.rule({
    name: 'common/space/trimLeft',
    index: '-4',
    handler: String.prototype.trimLeft ? function(text) {
        return text.trimLeft();
    } : /* istanbul ignore next */ function(text) {
        return text.replace(/^[\s\uFEFF\xA0]+/g, '');
    }
});

Typograf.rule({
    name: 'common/space/trimRight',
    index: '-3',
    live: false,
    handler: String.prototype.trimRight ? function(text) {
        return text.trimRight();
    } : /* istanbul ignore next */ function(text) {
        return text.replace(/[\s\uFEFF\xA0]+$/g, '');
    }
});

Typograf.rule({
    name: 'common/symbols/arrow',
    handler: function(text) {
        return Typograf._replace(text, [
            [/(^|[^-])->(?!>)/g, '$1→'],
            [/(^|[^<])<-(?!-)/g, '$1←']
        ]);
    }
});

Typograf.rule({
    name: 'common/symbols/cf',
    handler: function(text) {
        var re = new RegExp('(^|[^%])(\\d+)( |\u00A0)?(C|F)([\\W \\.,:!\\?"\\]\\)]|$)', 'g');

        return text.replace(re, '$1$2' + '\u2009' + '°$4$5');
    }
});

Typograf.rule({
    name: 'common/symbols/copy',
    handler: function(text) {
        return Typograf._replace(text, [
            [/\(r\)/gi, '®'],
            [/(copyright )?\((c|с)\)/gi, '©'],
            [/\(tm\)/gi, '™']
        ]);
    }
});

Typograf.rule({
    name: 'en/punctuation/quote',
    handler: function(text, settings) {
        return this._quote(text, settings);
    },
    settings: {
        lquote: '“',
        rquote: '”',
        lquote2: '‘',
        rquote2: '’'
    }
});

Typograf.rule({
    name: 'ru/dash/centuries',
    handler: function(text, settings) {
        var dashes = '(' + this.data('common/dash') + ')',
            re = new RegExp('(X|I|V)[ |\u00A0]?' + dashes + '[ |\u00A0]?(X|I|V)', 'g');

        return text.replace(re, '$1' + settings.dash + '$3');
    },
    settings: {
        dash: '\u2013' // &ndash;
    }
});

Typograf.rule({
    name: 'ru/dash/daysMonth',
    handler: function(text, settings) {
        var re = new RegExp('(^|\\s)([123]?\\d)' +
                '(' + this.data('common/dash') + ')' +
                '([123]?\\d)[ \u00A0]' +
                '(' + this.data('ru/monthGenCase') + ')', 'g');

        return text.replace(re, '$1$2' + settings.dash + '$4\u00A0$5');
    },
    settings: {
        dash: '\u2013' // &ndash;
    }
});

Typograf.rule({
    name: 'ru/dash/de',
    handler: function(text) {
        var re = new RegExp('([a-яё]+) де' + this.data('ru/dashAfterDe'), 'g');

        return text.replace(re, '$1-де');
    },
    disabled: true
});

Typograf.rule({
    name: 'ru/dash/decade',
    handler: function(text, settings) {
        var re = new RegExp('(^|\\s)(\\d{3}|\\d)0' +
                '(' + this.data('common/dash') + ')' +
                '(\\d{3}|\\d)0(-е[ \u00A0])' +
                '(?=г\\.?[ \u00A0]?г|год)', 'g');

        return text.replace(re, '$1$20' + settings.dash + '$40$5');
    },
    settings: {
        dash: '\u2013' // &ndash;
    }
});

Typograf.rule({
    name: 'ru/dash/directSpeech',
    handler: function(text) {
        var dashes = this.data('common/dash'),
            re1 = new RegExp('(["»‘“,])[ |\u00A0]?(' + dashes + ')[ |\u00A0]', 'g'),
            re2 = new RegExp('(^|' + Typograf._privateLabel + ')(' + dashes + ')( |\u00A0)', 'gm'),
            re3 = new RegExp('([.…?!])[ \u00A0](' + dashes + ')[ \u00A0]', 'g');

        return text
            .replace(re1, '$1\u00A0\u2014 ')
            .replace(re2, '$1\u2014\u00A0')
            .replace(re3, '$1 \u2014\u00A0');
    }
});

Typograf.rule({
    name: 'ru/dash/izpod',
    handler: function(text) {
        var re = new RegExp(this.data('ru/dashBefore') + '(И|и)з под' + this.data('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2з-под');
    }
});

Typograf.rule({
    name: 'ru/dash/izza',
    handler: function(text) {
        var re = new RegExp(this.data('ru/dashBefore') + '(И|и)з за' + this.data('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2з-за');
    }
});

Typograf.rule({
    name: 'ru/dash/ka',
    handler: function(text) {
        var re = new RegExp('([a-яё]+) ка(сь)?' + this.data('ru/dashAfter'), 'g');

        return text.replace(re, '$1-ка$2');
    }
});

Typograf.rule({
    name: 'ru/dash/koe',
    handler: function(text) {
        var re = new RegExp(this.data('ru/dashBefore') +
            '([Кк]о[ей])\\s([а-яё]{3,})' +
            this.data('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2-$3');
    }
});

Typograf.rule({
    name: 'ru/dash/main',
    index: '-5',
    handler: function(text) {
        var dashes = this.data('common/dash'),
            re = new RegExp('([ \u00A0])(' + dashes + ')([ \u00A0\\n])', 'g');

        return text.replace(re, '\u00A0\u2014$3');
    }
});

Typograf.rule({
    name: 'ru/dash/month',
    handler: function(text, settings) {
        var months = '(' + this.data('ru/month') + ')',
            monthsPre = '(' + this.data('ru/monthPreCase') + ')',
            dashes = this.data('common/dash'),
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

Typograf.rule({
    name: 'ru/dash/surname',
    handler: function(text) {
        var re = new RegExp('([А-ЯЁ][а-яё]+)\\s-([а-яё]{1,3})(?![^а-яё]|$)', 'g');

        return text.replace(re, '$1\u00A0\u2014$2');
    }
});

Typograf.rule({
    name: 'ru/dash/taki',
    handler: function(text) {
        var re = new RegExp('(верно|довольно|опять|прямо|так|вс[её]|действительно|неужели)\\s(таки)' +
            this.data('ru/dashAfter'), 'g');

        return text.replace(re, '$1-$2');
    }
});

Typograf.rule({
    name: 'ru/dash/time',
    handler: function(text, settings) {
        var re = new RegExp(this.data('ru/dashBefore') +
            '(\\d?\\d:[0-5]\\d)' +
            this.data('common/dash') +
            '(\\d?\\d:[0-5]\\d)' +
            this.data('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2' + settings.dash + '$3');
    },
    settings: {
        dash: '\u2013' // &ndash;
    }
});

Typograf.rule({
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
                this.data('ru/dashAfter'), 'gi');

        return text.replace(re, '$1-$3');
    }
});

Typograf.rule({
    name: 'ru/dash/weekday',
    handler: function(text, settings) {
        var part = '(' + this.data('ru/weekday') + ')',
            re = new RegExp(part + ' ?(' + this.data('common/dash') + ') ?' + part, 'gi');

        return text.replace(re, '$1' + settings.dash + '$3');
    },
    settings: {
        dash: '\u2013' // &ndash;
    }
});

Typograf.rule({
    name: 'ru/dash/years',
    handler: function(text, settings) {
        var dashes = this.data('common/dash'),
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

Typograf.rule({
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

Typograf.rule({
    name: 'ru/date/weekday',
    handler: function(text) {
        var space = '( |\u00A0)',
            monthCase = this.data('ru/monthGenCase'),
            weekday = this.data('ru/weekday'),
            re = new RegExp('(\\d)' + space + '(' + monthCase + '),' + space + '(' + weekday + ')', 'gi');

        return text.replace(re, function() {
            var a = arguments;
            return a[1] + a[2] + a[3].toLowerCase() + ',' + a[4] + a[5].toLowerCase();
        });
    }
});

Typograf.rule({
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

Typograf.rule({
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

Typograf.rule({
    name: 'ru/nbsp/abbr',
    handler: function(text) {
        var re = new RegExp('(^|\\s|' + Typograf._privateLabel + ')(([а-яё]{1,3}\\.){2,})(?![а-яё])', 'g');
        return text.replace(re, function($0, $1, $2) {
            var abbr = $2.split(/\./);
            // Являются ли сокращения ссылкой
            if (['рф', 'ру', 'рус', 'орг', 'укр', 'бг', 'срб'].indexOf(abbr[abbr.length - 2]) > -1) {
                return $0;
            }

            return $1 + $2.split(/\./).join('.\u00A0').trim();
        });
    }
});

Typograf.rule({
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

Typograf.rule({
    name: 'ru/nbsp/afterNumberSign',
    handler: function(text) {
        // \u2009 - THIN SPACE
        // \u202F - NARROW NO-BREAK SPACE
        return text.replace(/№[ \u00A0\u2009]?(\d|п\/п)/g, '№\u202F$1');
    }
});

Typograf.rule({
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

Typograf.rule({
    name: 'ru/nbsp/centuries',
    handler: function(text) {
        var dashes = this.data('common/dash'),
            before = '(^|\\s)([VIX]+)',
            after = '(?=[,;:?!"‘“»]|$)',
            re1 = new RegExp(before + '[ \u00A0]?в\\.?' + after, 'gm'),
            re2 = new RegExp(before + '(' + dashes + ')' + '([VIX]+)[ \u00A0]?в\\.?([ \u00A0]?в\\.?)?' + after, 'gm');

        return text
            .replace(re1, '$1$2\u00A0в.')
            .replace(re2, '$1$2$3$4\u00A0вв.');
    }
});

Typograf.rule({
    name: 'ru/nbsp/dayMonth',
    handler: function(text) {
        var re = new RegExp('(\\d{1,2}) (' + this.data('ru/shortMonth') + ')', 'gi');
        return text.replace(re, '$1\u00A0$2');
    }
});

Typograf.rule({
    name: 'ru/nbsp/groupNumbers',
    handler: function(text) {
        return text.replace(/(^ ?|\D )(\d{1,3}([ \u00A0\u202F\u2009]\d{3})+)(?! ?[\d-])/gm, function($0, $1, $2) {
            return $1 + $2.replace(/\s/g, '\u202F');
        });
    }
});

Typograf.rule({
    name: 'ru/nbsp/initials',
    handler: function(text) {
        var spaces = '\u00A0\u202F ', // nbsp, thinsp
            lquote = this.data('ru/lquote'),
            rquote = this.data('ru/rquote'),
            re = new RegExp('(^|[' + spaces +
                lquote +
                Typograf._privateLabel +
                '"])([А-ЯЁ])\\.[' + spaces + ']?([А-ЯЁ])\\.[' + spaces +
                ']?([А-ЯЁ][а-яё]+)(?=[\\s.,;:?!"' + rquote + ']|$)', 'gm');

        return text.replace(re, '$1$2.\u00A0$3.\u00A0$4');
    }
});

Typograf.rule({
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

Typograf.rule({
    name: 'ru/nbsp/ooo',
    handler: function(text) {
        return text.replace(/(^|[^a-яёA-ЯЁ])(ООО|ОАО|ЗАО|НИИ|ПБОЮЛ) /g, '$1$2\u00A0');
    }
});

Typograf.rule({
    name: 'ru/nbsp/page',
    handler: function(text) {
        var re = new RegExp('(^|[)\\s' + Typograf._privateLabel + '])' +
            '(стр|гл|рис|илл?|ст|п|c)\\. *(\\d+)([\\s.,?!;:]|$)', 'gim');

        return text.replace(re, '$1$2.\u00A0$3$4');
    }
});

Typograf.rule({
    name: 'ru/nbsp/ps',
    handler: function(text) {
        var re = new RegExp('(^|\\s|' + Typograf._privateLabel + ')[pз]\\.[ \u00A0]?([pз]\\.[ \u00A0]?)?[sы]\\.:? ', 'gim');
        return text.replace(re, function($0, $1, $2) {
            return $1 + ($2 ? 'P.\u00A0P.\u00A0S. ' : 'P.\u00A0S. ');
        });
    }
});

Typograf.rule({
    name: 'ru/nbsp/rubleKopek',
    handler: function(text) {
        return text.replace(/(\d) ?(?=(руб|коп)\.)/g, '$1\u00A0');
    }
});

Typograf.rule({
    name: 'ru/nbsp/see',
    handler: function(text) {
        var re = new RegExp('(^|\\s|' + Typograf._privateLabel + '|\\()(см|им)\\.[ \u00A0]?([а-яё0-9a-z]+)([\\s.,?!]|$)', 'gi');
        return text.replace(re, function($0, $1, $2, $3, $4) {
            return ($1 === '\u00A0' ? ' ' : $1) + $2 + '.\u00A0' + $3 + $4;
        });
    }
});

Typograf.rule({
    name: 'ru/nbsp/year',
    handler: function(text) {
        return text.replace(/(^|\D)(\d{4}) ?г([ ,;.\n]|$)/g, '$1$2\u00A0г$3');
    }
});

Typograf.rule({
    name: 'ru/nbsp/years',
    index: '+5',
    handler: function(text) {
        var dashes = this.data('common/dash'),
            re = new RegExp('(^|\\D)(\\d{4})(' +
                dashes + ')(\\d{4})[ \u00A0]?г\\.?([ \u00A0]?г\\.)?(?=[,;:?!"‘“»\\s]|$)', 'gm');

        return text.replace(re, '$1$2$3$4\u00A0гг.');
    }
});

Typograf.rule({
    name: 'ru/number/ordinals',
    handler: function(text) {
        var re = new RegExp('(\\d)-(ый|ой|ая|ое|ые|ым|ом|ых|ого|ому|ыми)(?![' + this.data('l') + '])', 'g');

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

Typograf.rule({
    name: name,
    handler: function(text) {
        return text
            .replace(/( |\u00A0)\(/g, '<span class="typograf-oa-sp-lbracket">$1</span><span class="typograf-oa-lbracket">(</span>')
            .replace(/^\(/gm, '<span class="typograf-oa-n-lbracket">(</span>');
    },
    disabled: true
}).innerRule({
    name: name,
    queue: 'start',
    handler: function(text) {
        return Typograf._removeOptAlignTags(text, classNames);
    }
}).innerRule({
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

Typograf.rule({
    name: name,
    handler: function(text) {
        var re = new RegExp('([' + this.data('l') + '\\d\u0301]+), ', 'gi');
        return text.replace(re, '$1<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>');
    },
    disabled: true
}).innerRule({
    name: name,
    queue: 'start',
    handler: function(text) {
        return Typograf._removeOptAlignTags(text, classNames);
    }
}).innerRule({
    name: name,
    queue: 'end',
    handler: function(text) {
        return Typograf._removeOptAlignTagsFromTitle(text, classNames);
    }
});

})();

Typograf._removeOptAlignTags = function(text, classNames) {
    var re = new RegExp('<span class="(' + classNames.join('|') + ')">(.*?)</span>', 'g');
    return text.replace(re, '$2');
};

Typograf._removeOptAlignTagsFromTitle = function(text, classNames) {
    return text.replace(/<title>.*?<\/title>/i, function(text) {
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

Typograf.rule({
    name: name,
    handler: function(text) {
        var name = 'ru/punctuation/quote',
            lquotes = '(["' +
                this.setting(name, 'lquote') +
                this.setting(name, 'lquote2') +
                this.setting(name, 'lquote3') +
                '])',
            re = new RegExp('([\\d' + this.data('l') + '\\-\u0301!?.:;,]+)( |\u00A0)(' + lquotes + ')', 'gi'),
            re2 = new RegExp('(^|' + Typograf._privateLabel + ')' + lquotes, 'gm');

        return text
            .replace(re, '$1<span class="typograf-oa-sp-lquote">$2</span><span class="typograf-oa-lquote">$3</span>')
            .replace(re2, '$1<span class="typograf-oa-n-lquote">$2</span>');
    },
    disabled: true
}).innerRule({
    name: name,
    queue: 'start',
    handler: function(text) {
        return Typograf._removeOptAlignTags(text, classNames);
    }
}).innerRule({
    name: name,
    queue: 'end',
    handler: function(text) {
        return Typograf._removeOptAlignTagsFromTitle(text, classNames);
    }
});

})();

Typograf.rule({
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
                result = [code.substr(0, 2), code.substr(2, 4)];
                break;
            case 5:
                result = [code.substr(0, 3), code.substr(3, 5)];
                break;
            case 6:
                result = [code.substr(0, 2), code.substr(2, 4), code.substr(4, 6)];
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

Typograf.rule({
    name: 'ru/other/phone-number',
    live: false,
    handler: function(text) {
        return text.replace(
            /(т.|тел.|ф.|моб.|факс|сотовый|мобильный|телефон)(\:?\s*?)([\+\d\(][\d \u00A0\-\(\)]{3,}\d)/gi,
            function($0, $1, $2, $3) {
                var buf = $3.replace(/[^\d\+]/g, '');
                if (buf.length >= 5) {
                    return $1 + $2 + phone(buf);
                }

                return $0;
            }
        );
    }
});

})();

Typograf.rule({
    name: 'ru/punctuation/ano',
    handler: function(text) {
        var re = new RegExp('([^!?,:;\\-‒–—])([ \u00A0\\n])(а|но)(?= |\u00A0|\\n)', 'g');
        return text.replace(re, '$1,$2$3');
    }
});

Typograf.rule({
    name: 'ru/punctuation/apostrophe',
    index: '-5',
    handler: function(text) {
        var letters = '([' + this.data('l') + '])',
            re = new RegExp(letters + '[\'’]' + letters, 'gi');

        return text.replace(re, '$1ʼ$2');
    }
});

Typograf.rule({
    name: 'ru/punctuation/exclamation',
    live: false,
    handler: function(text) {
        return text
            .replace(/(^|[^!])!{2}($|[^!])/, '$1!$2')
            .replace(/(^|[^!])!{4}($|[^!])/, '$1!!!$2');
    }
});

Typograf.rule({
    name: 'ru/punctuation/exclamationQuestion',
    index: '+5',
    handler: function(text) {
        var re = new RegExp('(^|[^!])!\\?([^?]|$)', 'g');
        return text.replace(re, '$1?!$2');
    }
});

Typograf.rule({
    name: 'ru/punctuation/hellip',
    handler: function(text) {
        return text
            .replace(/(^|[^.])\.{3,4}([^.]|$)/g, '$1…$2')
            .replace(/(^|[^.])(\.\.\.|…),/g, '$1…')
            .replace(/(\!|\?)(\.\.\.|…)([^.]|$)/g, '$1..$3');
    }
});

Typograf.rule({
    name: 'ru/punctuation/quote',
    handler: function(text, settings) {
        var lquote = settings.lquote,
            rquote = settings.rquote;

        text = this._quote(text, settings);
        if (lquote === settings.lquote2 && rquote === settings.rquote2) {
            return text
                // ««Энергия» Синергия» -> «Энергия» Синергия»
                .replace(new RegExp(lquote + lquote, 'g'), lquote)
                // «Энергия «Синергия»» -> «Энергия «Синергия»
                .replace(new RegExp(rquote + rquote, 'g'), rquote);
        }

        return text;
    },
    settings: {
        lquote: '«',
        rquote: '»',
        lquote2: '„',
        rquote2: '“',
        lquote3: '‚',
        rquote3: '‘'
    }
});

Typograf.rule({
    name: 'ru/space/afterHellip',
    handler: function(text) {
        return text
            .replace(/([а-яё])(\.\.\.|…)([А-ЯЁ])/g, '$1$2 $3')
            .replace(/([?!]\.\.)([а-яёa-z])/gi, '$1 $2');
    }
});

Typograf.rule({
    name: 'ru/space/year',
    handler: function(text) {
        var re = new RegExp('(^| |\u00A0)(\\d{3,4})(год([ауе]|ом)?)([^' +
            this.data('l') + ']|$)', 'g');
        return text.replace(re, '$1$2 $3$5');
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

Typograf.rule({
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

Typograf._sortRules();
Typograf._needSortRules = true;

return Typograf;

}));
