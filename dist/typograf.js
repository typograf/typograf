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
 * @param {string|Array[string]} [prefs.enable] Enable rules
 * @param {string|Array[string]} [prefs.disable] Disable rules
 */
function Typograf(prefs) {
    this._prefs = typeof prefs === 'object' ? prefs : {};

    this._settings = {};
    this._enabledRules = {};

    this._replaceLabel = this._replaceLabel.bind(this);
    this._pasteLabel = this._pasteLabel.bind(this);
    this._initSafeTags();

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
 * @param {Function} rule.func Processing function
 * @param {number} [rule.sortIndex] Sorting index for rule
 * @param {boolean} [rule.disabled] Rule is disabled by default
 * @param {Object} [rule.settings] Settings for rule
 * @return {Typograf} this
 */
Typograf.rule = function(rule) {
    rule.enabled = rule.enabled === false || rule.disabled === true ? false : true;
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
 * Get/set data for use in rules.
 *
 * @static
 * @param {string} key
 * @param {*} [value]
 * @return {*}
 */
Typograf.data = function(key, value) {
    if(arguments.length === 1) {
        return Typograf._data[key];
    } else {
        Typograf._data[key] = value;
    }
};

Typograf._data = {};

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

Typograf._quot = function(text, settings) {
    var letters = '\\d' + this.letters() + '\u0301',
        privateLabel = Typograf._privateLabel,
        lquot = settings.lquot,
        rquot = settings.rquot,
        lquot2 = settings.lquot2,
        rquot2 = settings.rquot2,
        quotes = '[' + Typograf.data('common/quot') + ']',
        phrase = '[' + letters + ')!?.:;#*,]*?',
        reL = new RegExp('"([…' + letters + '])', 'gi'),
        reR = new RegExp('(' + phrase + ')"(' + phrase + ')', 'gi'),
        reQuotes = new RegExp(quotes, 'g'),
        reFirstQuot = new RegExp('^(\s)?(' + quotes + ')', 'g'),
        reOpeningTag = new RegExp('(^|\\s)' + quotes + privateLabel, 'g'),
        reClosingTag = new RegExp(privateLabel + quotes + '([\s!?.:;#*,]|$)', 'g');

    text = text
        .replace(reQuotes, '"')
        .replace(reL, lquot + '$1') // Opening quote
        .replace(reR, '$1' + rquot + '$2') // Closing quote
        .replace(reOpeningTag, '$1' + lquot + privateLabel)
        .replace(reClosingTag, privateLabel + rquot + '$1')
        .replace(reFirstQuot, '$1' + lquot)
        .replace(new RegExp('(^|\\w|\\s)' + rquot + lquot, 'g'),
            '$1' + lquot + lquot); // Fixed for the case »« at the beginning of the text

    if(lquot2 && rquot2) {
        if(lquot === lquot2 && rquot === rquot2) {
            return text
                // ««Энергия» Синергия» -> «Энергия» Синергия»
                .replace(new RegExp(lquot + lquot, 'g'), lquot)
                // «Энергия «Синергия»» -> «Энергия «Синергия»
                .replace(new RegExp(rquot + rquot, 'g'), rquot);
        } else {
            return Typograf._innerQuot(text, settings);
        }
    }

    return text;
};

Typograf._innerQuot = function(text, settings) {
    var openingQuotes = [settings.lquot],
        closingQuotes = [settings.rquot],
        lquot = settings.lquot,
        rquot = settings.rquot,
        bufText = new Array(text.length);

    if(settings.lquot2 && settings.rquot2) {
        openingQuotes.push(settings.lquot2);
        closingQuotes.push(settings.rquot2);

        if(settings.lquot3 && settings.rquot3) {
            openingQuotes.push(settings.lquot3);
            closingQuotes.push(settings.rquot3);
        }
    }

    var level = -1,
        maxLevel = openingQuotes.length - 1;

    for(var i = 0, len = text.length; i < len; i++) {
        var letter = text[i];
        if(letter === lquot) {
            level++;
            if(level > maxLevel) {
                level = maxLevel;
            }
            bufText.push(openingQuotes[level]);
        } else if(letter === rquot) {
            if(level <= -1) {
                level = 0;
            }

            bufText.push(closingQuotes[level]);

            level--;
            if(level < -1) {
                level = -1;
            }
        } else {
            bufText.push(letter);
        }
    }

    return bufText.join('');
};

Typograf._langs = ['en', 'ru'];
Typograf._privateLabel = '\uDBFF';

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
                    this._onBeforeRule && this._onBeforeRule(text);
                    text = rule.func.call(this, text, this._settings[rule.name]);
                    this._onAfterRule && this._onAfterRule(text);
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

        this._isHTML = text.search(/<[a-z!]/i) !== -1;

        executeRulesForQueue('start');

        if(this._isHTML) {
            text = this._hideSafeTags(text);
        }

        text = this._utfication(text);
        executeRulesForQueue();
        text = this._modification(text, mode);

        if(this._isHTML) {
            text = this._showSafeTags(text);
        }

        executeRulesForQueue('end');

        this._lang = null;
        this._isHTML = null;

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
     * @param {string|Array[string]} ruleName
     * @return {Typograf} this
     */
    enable: function(ruleName) {
        return this._enable(ruleName, true);
    },
    /**
     * Disable a rule.
     *
     * @param {string|Array[string]} ruleName
     * @return {Typograf} this
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
            commonLetter = Typograf.data('common/letter'),
            langLetter = Typograf.data(lang + '/letter');

        return commonLetter === langLetter || !lang ? commonLetter : commonLetter + langLetter;
    },
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

        this._iLabel = 0;

        this._safeTags.forEach(function(tag) {
            var re = new RegExp(tag[0] + '[^]*?' + tag[1], 'gi');
            text = text.replace(re, this._pasteLabel);
        }, this);

        return this._hideHTMLTags(text);
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
        return text.replace(/<[a-z\/][^]*?>/gi, this._pasteLabel);
    },
    _showSafeTags: function(text) {
        var label = Typograf._privateLabel,
            reReplace = new RegExp(label + 'tf\\d+' + label, 'g'),
            reSearch = new RegExp(label + 'tf\\d');
        for(var i = 0; i < this._safeTags.length; i++) {
            text = text.replace(reReplace, this._replaceLabel);
            if(text.search(reSearch) === -1) {
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
    ['euro', 8364]
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

Typograf.data('common/letter', 'a-z');

Typograf.data('common/quot', '«‹»›„‚“‟‘‛”’"');

Typograf.data('en/letter', 'a-z');

Typograf.data('ru/letter', 'а-яё');

Typograf.data('ru/month', [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь'
]);

Typograf.data('ru/monthCase', [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
]);

Typograf.data('ru/shortMonth', [
    'янв',
    'фев',
    'мар',
    'апр',
    'ма[ейя]',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек'
]);

Typograf.data('ru/weekday', [
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
    'воскресенье'
]);

Typograf.rule({
    name: 'common/html/escape',
    sortIndex: 110,
    queue: 'end',
    func: function(text) {
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
    name: 'common/html/mail',
    sortIndex: 2000,
    func: function(text) {
        return text.replace(
            /(^|[\s;(])([\w\-.]{2,})@([\w\-.]{2,})\.([a-z]{2,6})([)\s.,!?]|$)/gi,
            '$1<a href="mailto:$2@$3.$4">$2@$3.$4</a>$5'
        );
    },
    disabled: true
});

Typograf.rule({
    name: 'common/html/nbr',
    sortIndex: 110,
    queue: 'start',
    func: function(text) {
        return text.search(/<br/) === -1 ? text.replace(/\n/g, '<br/>\n') : text;
    },
    disabled: true
});

Typograf.rule({
    name: 'common/html/pbr',
    sortIndex: 90,
    queue: 'end',
    func: function(text) {
        if(text.search(/<(p|br)[\s\/>]/) === -1) {
            if(text.search(/\n/) === -1) {
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
    sortIndex: 100,
    queue: 'end',
    func: function(text) {
        return text.replace(/<\/?[^>]+>/g, '');
    },
    disabled: true
});

Typograf.rule({
    name: 'common/html/url',
    sortIndex: 2010,
    func: function(text) {
        var prefix = '(http|https|ftp|telnet|news|gopher|file|wais)://',
            pureUrl = '([a-zA-Z0-9\/+-=%&:_.~?]+[a-zA-Z0-9#+]*)',
            re = new RegExp(prefix + pureUrl, 'g');

        return text.replace(re, function($0, protocol, path) {
            path = path
                .replace(/([^\/]+\/?)(\?|#)$/, '$1') // Remove ending ? and #
                .replace(/^([^\/]+)\/$/, '$1'); // Remove ending /
                
            if(protocol === 'http') {
                path = path.replace(/^([^\/]+)(:80)([^\d]|\/|$)/, '$1$3'); // Remove 80 port
            } else if(protocol === 'https') {
                path = path.replace(/^([^\/]+)(:443)([^\d]|\/|$)/, '$1$3'); // Remove 443 port
            }

            var url = path,
                fullUrl = protocol + '://' + path,
                firstPart = '<a href="' + fullUrl + '">';

            if(protocol === 'http' || protocol === 'https') {
                url = url.replace(/^www\./, '');

                return firstPart + (protocol === 'http' ? url : protocol + '://' + url) + '</a>';
            }

            return firstPart + fullUrl + '</a>';
        });
    },
    disabled: true
});

Typograf.rule({
    name: 'common/nbsp/afterNumber',
    sortIndex: 615,
    func: function(text) {
        var re = '(^|\\D)(\\d{1,5}) ([' +
            this.letters() +
            ']{2,})';

        return text.replace(new RegExp(re, 'gi'), '$1$2\u00A0$3');
    }
});

Typograf.rule({
    name: 'common/nbsp/afterPara',
    sortIndex: 610,
    func: function(text) {
        return text.replace(/§ ?(\d|I|V|X)/g, '§\u00A0$1');
    }
});

Typograf.rule({
    name: 'common/nbsp/afterShortWord', 
    sortIndex: 590,
    func: function(text, settings) {
        var len = settings.lengthShortWord,
            str = '(^| |\u00A0)([' +
                this.letters() +
                ']{1,' + len + '})(\\.?) ',
            re = new RegExp(str, 'gi');

        return text
            .replace(re, '$1$2$3\u00A0')
            .replace(re, '$1$2$3\u00A0');
    },
    settings: {
        lengthShortWord: 2
    }
});

Typograf.rule({
    name: 'common/nbsp/beforeShortLastWord',
    sortIndex: 620,
    func: function(text, settings) {
        var punc = '.,?!:;',
            re = new RegExp('([^' + punc + ']) ([' +
                this.letters() + ']{1,' + settings.lengthLastWord + '}[' + punc + '])', 'gi');

        return text.replace(re, '$1\u00A0$2');
    },
    settings: {
        lengthLastWord: 3
    }
});

Typograf.rule({
    name: 'common/nbsp/dpi',
    sortIndex: 1150,
    func: function(text) {
        return text.replace(/(\d) ?(lpi|dpi)(?!\w)/, '$1\u00A0$2');
    }
});

(function() {

function replaceNbsp($0, $1, $2, $3) {
    return $1 + $2.replace(/([^\u00A0])\u00A0([^\u00A0])/g, '$1 $2') + $3;
}

Typograf.rule({
    name: 'common/nbsp/nowrap',
    sortIndex: 100,
    queue: 'start',
    func: function(text) {
        return text
            .replace(/(<nowrap>)(.*?)(<\/nowrap>)/g, replaceNbsp)
            .replace(/(<nobr>)(.*?)(<\/nobr>)/g, replaceNbsp);
    }
});

})();

Typograf.rule({
    name: 'common/number/fraction',
    sortIndex: 1120,
    func: function(text) {
        return text.replace(/(^|\D)1\/2(\D|$)/g, '$1½$2')
            .replace(/(^|\D)1\/4(\D|$)/g, '$1¼$2')
            .replace(/(^|\D)3\/4(\D|$)/g, '$1¾$2');
    }
});

Typograf.rule({
    name: 'common/number/plusMinus',
    sortIndex: 1010,
    func: function(text) {
        var re = new RegExp('(^| |\\>|\u00A0)\\+-(\\d)', 'g');
        return text.replace(re, '$1±$2').replace(/(^\s*)\+-(\s*$)/g, '$1±$2');
    }
});

Typograf.rule({
    name: 'common/number/times',
    sortIndex: 1050,
    func: function(text) {
        return text.replace(/(\d) ?(x|х) ?(\d)/g, '$1×$3');
    }
});

Typograf.rule({
    name: 'common/other/repeatWord',
    sortIndex: 1200,
    func: function(text) {
        var re = '([' +
            this.letters() +
            '\u0301]+) \\1([;:,.?! \n])';

        return text.replace(new RegExp(re, 'gi'), '$1$2');
    },
    disabled: true
});

Typograf.rule({
    name: 'common/punctuation/delDoublePunctuation',
    sortIndex: 580,
    func: function(text) {
        return text.replace(/(,|:|;|\?){2,}/g, '$1');
    }
});

Typograf.rule({
    name: 'common/punctuation/exclamation',
    sortIndex: 1150,
    func: function(text) {
        return text
            .replace(/(^|[^!])!{2}($|[^!])/, '$1!$2')
            .replace(/(^|[^!])!{4}($|[^!])/, '$1!!!$2');
    }
});

Typograf.rule({
    name: 'common/punctuation/exclamationQuestion',
    sortIndex: 1140,
    func: function(text) {
        var re = new RegExp('(^|[^!])!\\?([^?]|$)', 'g');
        return text.replace(re, '$1?!$2');
    }
});

Typograf.rule({
    name: 'common/punctuation/hellip', 
    sortIndex: 20, 
    func: function(text) {
        return text.replace(/(^|[^.])\.{3,4}([^.]|$)/g, '$1…$2');
    }
});

Typograf.rule({
    name: 'common/space/afterPunctuation',
    sortIndex: 560,
    func: function(text) {
        var privateLabel = Typograf._privateLabel,
            reExcl = new RegExp('(!|;|\\?)([^!;?\\s[)' + privateLabel + Typograf.data('common/quot') + '])', 'g'),
            reComma = new RegExp('(\\D)(,|:)([^,:.?\\s\\/' + privateLabel + '])', 'g');

        return text
            .replace(reExcl, '$1 $2')
            .replace(reComma, '$1$2 $3');
    }
});

Typograf.rule({
    name: 'common/space/delBeforePercent',
    sortIndex: 600,
    func: function(text) {
        return text.replace(/(\d)( |\u00A0)(%|‰|‱)/g, '$1$3');
    }
});

Typograf.rule({
    name: 'common/space/delBeforePunctuation',
    sortIndex: 550,
    func: function(text) {
        return text.replace(/ (!|;|,|\?|\.|:)/g, '$1')
            .replace(/\( /g, '(')
            .replace(/([^ ])\(/g, '$1 (')
            .replace(/ \)/g, ')')
            .replace(/\)([^!;,\?\.:])/g, ') $1');
    }
});

Typograf.rule({
    name: 'common/space/delLeadingBlanks',
    sortIndex: 504,
    func: function(text) {
        return text.replace(/\n[ \t]+/g, '\n');
    },
    disabled: true
});

Typograf.rule({
    name: 'common/space/delRepeatN',
    sortIndex: 545,
    func: function(text) {
        return text.replace(/\n{3,}/g, '\n\n');
    }
});

Typograf.rule({
    name: 'common/space/delRepeatSpace',
    sortIndex: 540,
    func: function(text) {
        return text.replace(/([^\n \t])( |\t){2,}([^\n \t])/g, '$1$2$3');
    }
});

Typograf.rule({
    name: 'common/space/delTrailingBlanks',
    sortIndex: 505,
    func: function(text) {
        return text.replace(/[ \t]+\n/g, '\n');
    }
});

Typograf.rule({
    name: 'common/space/replaceTab',
    sortIndex: 510,
    func: function(text) {
        return text.replace(/\t/g, ' ');
    }
});

Typograf.rule({
    name: 'common/space/trimLeft',
    sortIndex: 530,
    func: String.prototype.trimLeft ? function(text) {
        return text.trimLeft();
    } : /* istanbul ignore next */ function(text) {
        return text.replace(/^[\s\uFEFF\xA0]+/g, '');
    }
});

Typograf.rule({
    name: 'common/space/trimRight',
    sortIndex: 535,
    func: String.prototype.trimRight ? function(text) {
        return text.trimRight();
    } : /* istanbul ignore next */ function(text) {
        return text.replace(/[\s\uFEFF\xA0]+$/g, '');
    }
});

Typograf.rule({
    name: 'common/sym/arrow',
    sortIndex: 1130,
    func: function(text) {
        return text.replace(/(^|[^-])->(?!>)/g, '$1→').replace(/(^|[^<])<-(?!-)/g, '$1←');
    }
});

Typograf.rule({
    name: 'common/sym/cf',
    sortIndex: 1020,
    func: function(text) {
        var re = new RegExp('(\\d+)( |\u00A0)?(C|F)([\\W \\.,:!\\?"\\]\\)]|$)', 'g');

        return text.replace(re, '$1' + '\u2009' + '°$3$4');
    }
});

Typograf.rule({
    name: 'common/sym/copy',
    sortIndex: 10,
    func: function(text) {
        return text.replace(/\(r\)/gi, '®')
            .replace(/(copyright )?\((c|с)\)/gi, '©')
            .replace(/\(tm\)/gi, '™');
    }
});

Typograf.rule({
    name: 'en/punctuation/quot',
    sortIndex: 700,
    func: Typograf._quot,
    settings: {
        lquot: '“',
        rquot: '”',
        lquot2: '‘',
        rquot2: '’'
    }
});

Typograf.data('ru/dash', {
    before: '(^| |\\n)',
    after: '( |,|\\.|\\?|:|!|$)'
});

Typograf.rule({
    name: 'ru/dash/izpod',
    sortIndex: 35,
    func: function(text) {
        var ruDash = Typograf.data('ru/dash'),
            re = new RegExp(ruDash.before + '(И|и)з под' + ruDash.after, 'g');

        return text.replace(re, '$1$2з-под$3');
    }
});

Typograf.rule({
    name: 'ru/dash/izza',
    sortIndex: 33,
    func: function(text) {
        var ruDash = Typograf.data('ru/dash'),
            re = new RegExp(ruDash.before + '(И|и)з за' + ruDash.after, 'g');

        return text.replace(re, '$1$2з-за$3');
    }
});

Typograf.rule({
    name: 'ru/dash/kade',
    sortIndex: 31,
    func: function(text) {
        var re = new RegExp('([a-яё]+)( | ?- ?)(ка|де|кась)' + Typograf.data('ru/dash').after, 'g');
        return text.replace(re, '$1-$3$4');
    }
});

Typograf.rule({
    name: 'ru/dash/koe',
    sortIndex: 38,
    func: function(text) {
        var ruDash = Typograf.data('ru/dash'),
            re = new RegExp(ruDash.before + '([Кк]о[ей])\\s([а-яё]{3,})' + ruDash.after, 'g');

        return text.replace(re, '$1$2-$3$4');
    }
});

Typograf.rule({
    name: 'ru/dash/main',
    sortIndex: 620,
    func: function(text) {
        var name = 'ru/dash/main',
            dashes = '(' + Typograf.data('common/dash') + ')',
            reMain = new RegExp('( |\u00A0)' + dashes + '( |\\n)', 'g'),
            reDirect = new RegExp('(^|' + Typograf._privateLabel + ')' + dashes + '( |\u00A0)', 'gm'),
            reInterval = new RegExp('(X|I|V)(?: |\u00A0)?' + dashes + '(?: |\u00A0)?(X|I|V)', 'g');

        return text
            .replace(reMain, '\u00A0' + this.setting(name, 'dash') + '$3')
            .replace(reDirect, '$1' + this.setting(name, 'dash') + '\u00A0')
            .replace(reInterval, '$1' + this.setting(name, 'dashInterval') + '$3');
    },
    settings: {
        dash: '\u2014', // &mdash;
        dashInterval: '\u2014' // &mdash;
    }
});

Typograf.rule({
    name: 'ru/dash/month',
    sortIndex: 610,
    func: function(text) {
        var part = '(' + Typograf.data('ru/month').join('|') + ')',
            re = new RegExp(part + ' ?(' + Typograf.data('common/dash') + ') ?' + part, 'gi');

        return text.replace(re, '$1' + this.setting('ru/dash/main', 'dashInterval') + '$3');
    }
});

Typograf.rule({
    name: 'ru/dash/taki',
    sortIndex: 39,
    func: function(text) {
        var re = new RegExp('(верно|довольно|опять|прямо|так|вс[её]|действительно|неужели)\\s(таки)' +
            Typograf.data('ru/dash').after, 'g');

        return text.replace(re, '$1-$2$3');
    }
});

Typograf.rule({
    name: 'ru/dash/to',
    sortIndex: 30,
    func: function(text) {
        var words = [
                'откуда', 'куда', 'где',
                'когда', 'зачем', 'почему',
                'как', 'како[ейм]', 'какая', 'каки[емх]', 'какими', 'какую',
                'что', 'чего', 'че[йм]', 'чьим?',
                'кто', 'кого', 'кому', 'кем'
            ],
            re = new RegExp('(' + words.join('|') + ')( | ?- ?)(то|либо|нибудь)' +
                Typograf.data('ru/dash').after, 'gi');

        return text.replace(re, '$1-$3$4');
    }
});

Typograf.rule({
    name: 'ru/dash/weekday',
    sortIndex: 600,
    func: function(text) {
        var part = '(' + Typograf.data('ru/weekday').join('|') + ')',
            re = new RegExp(part + ' ?(' + Typograf.data('common/dash') + ') ?' + part, 'gi');

        return text.replace(re, '$1' + this.setting('ru/dash/main', 'dashInterval') + '$3');
    }
});

Typograf.rule({
    name: 'ru/date/main',
    sortIndex: 1300,
    func: function(text) {
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
    sortIndex: 1310,
    func: function(text) {
        var space = '( |\u00A0)',
            monthCase = Typograf.data('ru/monthCase').join('|'),
            weekday = Typograf.data('ru/weekday').join('|'),
            re = new RegExp('(\\d)' + space + '(' + monthCase + '),' + space + '(' + weekday + ')', 'gi');

        return text.replace(re, function() {
            var a = arguments;
            return a[1] + a[2] + a[3].toLowerCase() + ',' + a[4] + a[5].toLowerCase();
        });
    }
});

Typograf.rule({
    name: 'ru/money/dollar',
    sortIndex: 1140,
    func: function(text) {
        var re1 = new RegExp('(^|[\\D]{2,})\\$ ?([\\d.,]+)', 'g'),
            re2 = new RegExp('(^|[\\D])([\\d.,]+) ?\\$', 'g'),
            rep = '$1$2\u00A0$';

        return text
            .replace(re1, rep)
            .replace(re2, rep);
    }
});

Typograf.rule({
    name: 'ru/money/euro',
    sortIndex: 1140,
    func: function(text) {
        var re1 = new RegExp('(^|[\\D]{2,})€ ?([\\d.]+)', 'g'),
            re2 = new RegExp('(^|[\\D])([\\d.,]+) ?€', 'g'),
            rep = '$1$2\u00A0€';

        return text
            .replace(re1, rep)
            .replace(re2, rep);
    }
});

Typograf.rule({
    name: 'ru/money/ruble',
    sortIndex: 1145,
    func: function(text) {
        var rep = '$1\u00A0₽';
        return text
            .replace(/^(\d+)( |\u00A0)?(р|руб)\.$/, rep)
            .replace(/(\d+)( |\u00A0)?(р|руб)\.(?=[!?,:;])/g, rep)
            .replace(/(\d+)( |\u00A0)?(р|руб)\.(?=\s+[A-ЯЁ])/g, rep + '.');
    },
    disabled: true
});

Typograf.rule({
    name: 'ru/nbsp/abbr',
    sortIndex: 565,
    func: function(text) {
        return text.replace(/(^|\s)([а-яё]{1,3}\.){2,}(?![а-яё])/g, function($0, $1) {
            var abbr = $0.split(/\./);
            // Являются ли сокращения ссылкой
            if(['рф', 'ру', 'рус', 'орг', 'укр', 'бг', 'срб'].indexOf(abbr[abbr.length - 2]) > -1) {
                return $0;
            }

            return $1 + $0.split(/\./).join('.\u00A0').trim();
        });
    }
});

/*jshint maxlen:1000 */
Typograf.rule({
    name: 'ru/nbsp/addr',
    sortIndex: 1115,
    func: function(text) {
        return text
            .replace(/(\s|^)(дом|д\.|кв\.|под\.|п\-д) *(\d+)/gi, '$1$2\u00A0$3')
            .replace(/(\s|^)(мкр-н|мк-н|мкр\.|мкрн)\s/gi, '$1$2\u00A0') // микрорайон
            .replace(/(\s|^)(эт\.) *(-?\d+)/gi, '$1$2\u00A0$3')
            .replace(/(\s|^)(\d+) +этаж([^а-яё]|$)/gi, '$1$2\u00A0этаж$3')
            .replace(/(\s|^)литер\s([А-Я]|$)/gi, '$1литер\u00A0$2')
            /*
                область, край, город, станция, поселок, село,
                деревня, улица, переулок, проезд, проспект,
                бульвар, площадь, набережная, шоссе,
                тупик, офис, комната, участок, владение, строение, корпус
            */
            .replace(/(\s|^)(обл|кр|г|ст|пос|с|д|ул|пер|пр|пр\-т|просп|пл|бул|б\-р|наб|ш|туп|оф|комн?|уч|вл|влад|стр|кор)\. *([а-яёa-z\d]+)/gi, '$1$2.\u00A0$3');
    }
});

Typograf.rule({
    name: 'ru/nbsp/afterNumberSign',
    sortIndex: 610,
    func: function(text) {
        return text.replace(/№ ?(\d|п\/п)/g, '№\u00A0$1');
    }
});

Typograf.rule({
    name: 'ru/nbsp/beforeParticle',
    sortIndex: 570,
    func: function(text) {
        return text.replace(/ (ли|ль|же|ж|бы|б)([^а-яёА-ЯЁ])/g, '\u00A0$1$2');
    }
});

Typograf.rule({
    name: 'ru/nbsp/but',
    sortIndex: 1110,
    func: function(text) {
        var re = new RegExp(',?( |\u00A0|\n)(а|но)( |\u00A0|\n)', 'g');
        return text.replace(re, ',$1$2$3');
    }
});

Typograf.rule({
    name: 'ru/nbsp/cc',
    sortIndex: 1090,
    func: function(text) {
        text = text.replace(/(^|\d|V|I|X) ?в(в)?( |,|;|\n|$)/g, '$1\u00A0в$2.$3');

        return text.replace(/(^|\d|[IVX]) ?в\.? ?в\./g, '$1\u00A0вв.');
    }
});

Typograf.rule({
    name: 'ru/nbsp/dayMonth',
    sortIndex: 1105,
    func: function(text) {
        var re = new RegExp('(\\d{1,2}) (' + Typograf.data('ru/shortMonth').join('|') + ')', 'gi');
        return text.replace(re, '$1\u00A0$2');
    }
});

Typograf.rule({
    name: 'ru/nbsp/m',
    sortIndex: 1030,
    func: function(text) {
        var m = '(км|м|дм|см|мм)',
            re2 = new RegExp('(^|\\D)(\\d+) ?' + m + '2(\\D|$)', 'g'),
            re3 = new RegExp('(^|\\D)(\\d+) ?' + m + '3(\\D|$)', 'g');

        return text
            .replace(re2, '$1$2\u00A0$3²$4')
            .replace(re3, '$1$2\u00A0$3³$4');
    }
});

Typograf.rule({
    name: 'ru/nbsp/ooo',
    sortIndex: 1100,
    func: function(text) {
        return text.replace(/(^|[^a-яёA-ЯЁ])(ООО|ОАО|ЗАО|НИИ|ПБОЮЛ) /g, '$1$2\u00A0');
    }
});

Typograf.rule({
    name: 'ru/nbsp/page',
    sortIndex: 610,
    func: function(text) {
        return text.replace(/ (стр|гл|рис|илл)\./g, '\u00A0$1.');
    }
});

Typograf.rule({
    name: 'ru/nbsp/xxxx',
    sortIndex: 1060,
    func: function(text) {
        return text.replace(/(^|\D)(\d{1,4}) ?г(од| |,|;|\.|\n|$)/g, '$1$2\u00A0г$3');
    }
});

Typograf.rule({
    name: 'ru/nbsp/yy',
    sortIndex: 1080,
    func: function(text) {
        return text.replace(/(^|\d) ?г\. ?г\./g, '$1\u00A0гг.');
    }
});

Typograf.rule({
    name: 'ru/number/ordinals',
    sortIndex: 1300,
    func: function(text) {
        return text
            .replace(/(\d)-(ый|ой)([^а-яё]|$)/g, '$1-й$3')
            .replace(/(\d)-ая([^а-яё]|$)/g, '$1-я$2')
            .replace(/(\d)-(ое|ые)([^а-яё]|$)/g, '$1-е$3')
            .replace(/(\d)-(ым|ом)([^а-яё]|$)/g, '$1-м$3')
            .replace(/(\d)-ых([^а-яё]|$)/g, '$1-х$2')
            .replace(/(\d)-ого([^а-яё]|$)/g, '$1-го$2')
            .replace(/(\d)-ому([^а-яё]|$)/g, '$1-му$2')
            .replace(/(\d)-ыми([^а-яё]|$)/g, '$1-ми$2');
    }
});

/*jshint maxlen:1000 */
Typograf.rule({
    name: 'ru/optalign/bracket',
    sortIndex: 1001,
    func: function(text, settings) {
        return text
            .replace(/( |\u00A0)\(/g, '<span class="typograf-oa-sp-lbracket">$1</span><span class="typograf-oa-lbracket">(</span>')
            .replace(/(^|\n)\(/g, '$1<span class="typograf-oa-n-lbracket">(</span>');
    },
    disabled: true
})
.innerRule({
    name: 'ru/optalign/bracket',
    func: function(text) {
        // Зачистка HTML-тегов от висячей пунктуации для скобки
        return text.replace(/<span class="typograf-oa-(sp-lbracket|lbracket|n-lbracket)">(.*?)<\/span>/g, '$2');
    }
});

/*jshint maxlen:1000 */
Typograf.rule({
    name: 'ru/optalign/comma',
    sortIndex: 1002,
    func: function(text, settings) {
        var re = new RegExp('([' + this.letters() + '\\d\u0301]+), ', 'gi');
        return text.replace(re, '$1<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>');
    },
    disabled: true
})
.innerRule({
    name: 'ru/optalign/comma',
    func: function(text) {
        // Зачистка HTML-тегов от висячей пунктуации для запятой
        return text.replace(/<span class="typograf-oa-(comma|comma-sp)">(.*?)<\/span>/g, '$2');
    }
});

/*jshint maxlen:1000 */
Typograf.rule({
    name: 'ru/optalign/quot',
    sortIndex: 1000,
    func: function(text) {
        var lquotes = '(["' +
                this.setting('ru/punctuation/quot', 'lquot') +
                this.setting('ru/punctuation/quot', 'lquot2') +
                '])',
            re = new RegExp('([\\d' + this.letters() + '\\-\u0301!?.:;,]+)( |\u00A0)(' + lquotes + ')', 'gi'),
            re2 = new RegExp('(^|\n|' + Typograf._privateLabel + ')' + lquotes, 'g');

        return text
            .replace(re, '$1<span class="typograf-oa-sp-lquot">$2</span><span class="typograf-oa-lquot">$3</span>')
            .replace(re2, '$1<span class="typograf-oa-n-lquot">$2</span>');
    },
    disabled: true
})
.innerRule({
    name: 'ru/optalign/quot',
    func: function(text) {
        // Зачистка HTML-тегов от висячей пунктуации для кавычки
        return text.replace(/<span class="typograf-oa-(sp-lquot|lquot|n-lquot)">(.*?)<\/span>/g, '$2');
    }
});

Typograf.rule({
    name: 'ru/other/accent',
    sortIndex: 560,
    func: function(text) {
        return text.replace(/([а-яё])([АЕЁИОУЫЭЮЯ])([^А-ЯЁ\w]|$)/g, function($0, $1, $2, $3) {
           return $1 + $2.toLowerCase() + '\u0301' + $3;
        });
    },
    disabled: true
});

Typograf.rule({
    name: 'ru/punctuation/quot',
    sortIndex: 700,
    func: Typograf._quot,
    settings: {
        lquot: '«',
        rquot: '»',
        lquot2: '„',
        rquot2: '“',
        lquot3: '‚',
        rquot3: '‘'
    }
});

Typograf._sortRules();
Typograf._needSortRules = true;

return Typograf;

}));
