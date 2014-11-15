/*! Typograf | (c) 2014 Denis Seleznev | https://github.com/hcodes/typograf/ */

/**
 * @constructor
 */
function Typograf(prefs) {
    this._prefs = typeof prefs === 'object' ? prefs : {};

    this._settings = {};
    this._enabledRules = {};

    this._rules.forEach(function(rule) {
        var name = rule.name;
        rule._lang = name.split('/')[0];

        this._settings[name] = rule.settings || {};
        this._enabledRules[name] = rule.enabled;
    }, this);
}

/**
 * Добавить правило.
 *
 * @static
 * @param {Object} rule
 * @param {string} rule.name Название правила
 * @param {string} rule.title Описание правила
 * @param {string} rule.sortIndex Индекс сортировки, чем выше, тем позже выполняется
 * @param {Function} rule.func Функция обработки
 * @param {boolean} rule.enabled Включено ли правило по умолчанию
 * @return {Typograf} this
 */
Typograf.rule = function(rule) {
    rule.enabled = rule.enabled === false ? false : true;

    Typograf.prototype._rules.push(rule);

    if(Typograf._needSortRules) {
        this._sortRules();
    }

    return this;
};

/**
 * Добавить общие данные для использования в правилах.
 *
 * @static
 * @param {string} key Название ключа
 * @param {*} value Значение ключа
 */
Typograf.data = function(key, value) {
    Typograf.prototype.data[key] = value;
};

Typograf._sortRules = function() {
    Typograf.prototype._rules.sort(function(a, b) {
        return a.sortIndex > b.sortIndex ? 1 : -1;
    });
};

Typograf.prototype = {
    constructor: Typograf,
    /**
    * Типографировать текст.
    *
    * @param {string} text
    * @param {Object} params
    * @return {string}
    */
    execute: function(text, params) {
        var lang = params && params.lang;
        if(!lang) {
            lang = this._prefs.lang;
        }

        text = '' + text;

        if(!text) {
            return '';
        }

        text = text
            .replace(/\r\n/g, '\n') // Windows
            .replace(/\r/g, '\n'); // MacOS

        var isHTML = text.search(/<|>/) !== -1;

        if(isHTML) {
            text = this._hideSafeTags(text);
        }

        text = this._utfication(text);

        this._rules.forEach(function(rule) {
            if(this.enabled(rule.name) && (rule._lang === 'common' || rule._lang === lang)) {
                text = rule.func.call(this, text, this._settings[rule.name]);
            }
        }, this);

        text = this._modification(text);

        if(isHTML) {
            text = this._showSafeTags(text);
        }

        return text;
    },

    /**
     * Установить/получить настройку
     *
     * @param {string} rule Имя правила
     * @param {string} name Имя настройки
     * @return {*} [value] Значение настройки
     */
    setting: function(rule, name, value) {
        if(arguments.length <= 2) {
            return this._settings[rule] && this._settings[rule][name];
        } else {
            this._settings[rule] = this._settings[rule] || {};
            this._settings[rule][name] = value;

            return this;
        }
    },

    /**
     * Включено ли правило.
     *
     * @param {string} rule Название правила
     * @return {boolean}
     */
    enabled: function(rule) {
        return this._enabledRules[rule];
    },

    /**
     * Отключено ли правило.
     *
     * @param {string} rule Название правила
     * @return {boolean}
     */
    disabled: function(rule) {
        return !this._enabledRules[rule];
    },

    /**
     * Включить правило.
     *
     * @param {string} rule Название правила
     * @return {boolean}
     */
    enable: function(rule) {
        return this._enable(rule, true);
    },

    /**
     * Отключить правило.
     *
     * @param {string} rule Название правила
     * @return {boolean}
     */
    disable: function(rule) {
        return this._enable(rule, false);
    },
    data: {},
    _enable: function(rule, enabled) {
        if(Array.isArray(rule)) {
            rule.forEach(function(el) {
                this._enabledRules[el] = enabled;
            }, this);
        } else {
            this._enabledRules[rule] = enabled;
        }

        return this;
    },
    _rules: [],
    _hideSafeTags: function(text) {
        this._hiddenSafeTags = {};

        var that = this,
            re = '',
            tags = [
            ['<!--', '-->'],
            ['<pre[^>]*>', '<\\/pre>'],
            ['<code[^>]*>', '<\\/code>'],
            ['<style[^>]*>', '<\\/style>'],
            ['<script[^>]*>', '<\\/script>'],
            ['<object>', '<\\/object>']
        ];

        tags.forEach(function(tag) {
                re += '(' + tag[0] + '(.|\\n)*?' + tag[1] + ')|';
        }, this);

        var i = 0;
        text = text.replace(new RegExp('(' + re + '<[^>]*[\\s][^>]*>)', 'gim'), function(match) {
            var key = '__typograf' + i + '__';
            that._hiddenSafeTags[key] = match;
            i++;

            return key;
        });

        return text;
    },
    _showSafeTags: function(text) {
        Object.keys(this._hiddenSafeTags).forEach(function(key) {
            text = text.replace(new RegExp(key, 'gim'), this._hiddenSafeTags[key]);
        }, this);

        delete this._hiddenSafeTags;

        return text;
    },
    _utfication: function(text) {
        if(text.search('&') === -1) {
            return text;
        }

        this.entities.forEach(function(entity) {
            text = text.replace(entity[3], entity[2]);
        }, this);

        return text;
    },
    _modification: function(text) {
        var mode = this._prefs.mode,
            index;

        if(mode === 'name' || mode === 'digit') {
            index = mode === 'name' ? 0 : 1;
            this.entities.forEach(function(entity) {
                text = text.replace(new RegExp(entity[2], 'g'), entity[index]);
            }, this);
        }

        return text;
    }
};

if(typeof exports === 'object') {
    module.exports = Typograf;
}

Typograf.prototype.entities = [];

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
    [null, 8381] // рубль
].forEach(function(en) {
    var name = en[0],
        num = en[1],
        buf = ['&' + name + ';', '&#' + num + ';', String.fromCharCode(en[1])];

    buf.push(new RegExp('(\\&\\#' + num + ';' + (name ? '|\\&' + name + ';' : '') + ')', 'g'));

    Typograf.prototype.entities.push(buf);
}, this);

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
    title: 'Удаление двойной пунктуации',
    name: 'common/delDoublePunctiation',
    sortIndex: 580,
    func: function(text) {
        return text.replace(/(,|:|;|\?){2,}/g, '$1');
    }
});

Typograf.rule({
    title: '!! → !',
    name: 'common/exclamation',
    sortIndex: 1150,
    func: function(text) {
        return text
            .replace(/(^|[^!])\!{2}($|[^!])/, '$1!$2')
            .replace(/(^|[^!])\!{4}?($|[^!])/, '$1!!!$2');
    }
});

Typograf.rule({
    title: '!? → ?!',
    name: 'common/exclamationQuestion',
    sortIndex: 1140,
    func: function(text) {
        var re = new RegExp('(^|[^!])!\\?([^?]|$)', 'g');
        return text.replace(re, '$1?!$2');
    }
});

Typograf.rule({
    title: 'Расстановка кавычек',
    name: 'ru/quot',
    sortIndex: 700,
    func: function(text, settings) {
        var letter = '[\\w\\dа-яёА-ЯЁ]',
            lquot = settings.lquot,
            rquot = settings.rquot,
            lquot2 = settings.lquot2,
            rquot2 = settings.rquot2,
            tag = '(?:^|<\\w.*?>)*',
            phraseL = '(?:…|' + letter + '|\\n)',
            phraseR = '(?:' + [letter, '[)!?.:;#*,]'].join('|') + ')*',
            quotesL = '(«|»|„|“|”|‘|’|&quot;|")',
            quotesR = '(»|“|”|&quot;|")',
            reL = new RegExp('(' + tag + ')?' + quotesL + '(' + tag + phraseL + tag + ')', 'g'),
            reR = new RegExp('(' + tag + phraseR + tag + ')' + quotesR + '(' + phraseR + ')', 'g'),
            reL2 = new RegExp('(' + lquot + ')(.*?)' + lquot + '(.*?)(' + rquot + ')', 'g'),
            reR2 = new RegExp('(' + lquot + ')(.*?)' + rquot + '(.*?)(' + rquot + ')', 'g'),
            reDoubleL = new RegExp(lquot + lquot, 'g'),
            reDoubleR = new RegExp(rquot + rquot, 'g');
            
        text = text
            .replace(reL, '$1' + lquot + '$3')
            .replace(reR, '$1' + rquot + '$3');
            
        if(lquot === lquot2 && rquot === rquot2) {
            text = text
                .replace(reDoubleL, '$1$2' + lquot + '$3$4')
                .replace(reDoubleR, '$1$2' + rquot + '$3$4');
        } else {
            text = text
                .replace(reL2, '$1$2' + lquot2 + '$3$4')
                .replace(reR2, '$1$2' + rquot2 + '$3$4');
        }

        return text;
    },
    settings: {
        lquot: '«',
        rquot: '»',
        lquot2: '„',
        rquot2: '“'
    }
});

Typograf.rule({
    title: 'Замена перевода строки на <br/>',
    name: 'common/html/nbr',
    sortIndex: 710,
    func: function(text) {
        return text.replace(/\n/g, '<br/>');
    },
    enabled: false
});

Typograf.rule({
    title: 'Расстановка <p> и <br/>',
    name: 'common/html/pbr',
    sortIndex: 700,
    func: function(text) {
        if(text.search(/\n/) === -1) {
            text = '<p>' + text + '</p>';
        } else {
            text = '<p>' + text.replace(/\n\n/g, '</p>\n<p>') + '<\/p>';
            text = text.replace(/([^>])\n/g, '$1<br/>\n');
        }

        return text;
    },
    enabled: false
});

Typograf.rule({
    title: 'Удаление HTML-тегов',
    name: 'common/html/stripTags',
    sortIndex: 5,
    func: function(text) {
        return text.replace(/<\/?[^>]+>/g, '');
    },
    enabled: false
});

Typograf.rule({
    title: 'Расстановка ссылок',
    name: 'common/html/url',
    sortIndex: 200,
    func: function(text) {
        var prefix = '(http|https|ftp|telnet|news|gopher|file|wais)://',
            pureUrl = '([a-zA-Z0-9\/\\n+-=%&:_.~?]+[a-zA-Z0-9#+]*)',
            re = new RegExp(prefix + pureUrl, 'g');

        return text.replace(re, function($0, $1, $2) {
            var url = $2,
                fullUrl = $1 + '://' + $2,
                firstPart = '<a href="' + fullUrl + '">';

            if($1 === 'http') {
                url = url
                    .replace(/^www\./, '')
                    .replace(/^([^\/]+)\/$/, '$1');

                return firstPart + url + '</a>';
            }

            return firstPart + fullUrl + '</a>';
        });
    }
});

Typograf.rule({
    title: 'Неразрывный пробел после §',
    name: 'common/nbsp/afterPara',
    sortIndex: 610,
    func: function(text) {
        return text.replace(/§ ?(\d|I|V|X)/g, '§\u00A0$1');
    }
});

Typograf.rule({
    title: 'Неразрывный пробел после короткого слова',
    name: 'common/nbsp/afterShortWord', 
    sortIndex: 590,
    func: function(text, settings) {
        var len = settings.lengthShortWord,
        re = new RegExp('( [\\w]{1,' + len + '}) ', 'g');

        return text.replace(re, '$1\u00A0');
    },
    settings: {
        lengthShortWord: 2
    }
});

Typograf.rule({
    title: 'Неразрывный пробел перед последним коротким словом в предложении',
    name: 'common/nbsp/beforeShortLastWord',
    sortIndex: 620,
    func: function(text, settings) {
        var len = settings.lengthLastWord,
            re = new RegExp(' ([\\w]{1,' + len + '})(\\.|\\?|:|!|,)', 'g');

        return text.replace(re, '\u00A0$1$2');
    },
    settings: {
        lengthLastWord: 3
    }
});

Typograf.rule({
    title: 'Пробел после знаков пунктуации', 
    name: 'common/space/afterPunctuation', 
    sortIndex: 560, 
    func: function(text) {
        return text
            .replace(/(\!|;|\?)([^ \n\t\!;\?])/g, '$1 $2')
            .replace(/(\D)(,|\:)([^ \/\d\n\t\!;,\?\.\:])/g, '$1$2 $3');
    }
});

Typograf.rule({
    title: 'Удаление пробела перед %',
    name: 'common/space/delBeforePercent',
    sortIndex: 600,
    func: function(text) {
        return text.replace(/(\d)( |\u00A0)%/g, '$1%');
    }
});

Typograf.rule({
    title: 'Удаление пробелов перед знаками пунктуации',
    name: 'common/space/delBeforePunctuation',
    sortIndex: 550,
    func: function(text) {
        return text.replace(/ (\!|;|,|\?|\.|\:)/g, '$1')
            .replace(/\( /g, '(')
            .replace(/([^ ])\(/g, '$1 (')
            .replace(/ \)/g, ')')
            .replace(/\)([^\!;,\?\.\:])/g, ') $1');
    }
});

Typograf.rule({
    title: 'Удаление повторяющихся переносов строки (не более двух)',
    name: 'common/space/delRepeatN',
    sortIndex: 545,
    func: function(text) {
        return text.replace(/\n{3,}/g, '\n\n');
    }
});

Typograf.rule({
    title: 'Удаление повторяющихся пробелов',
    name: 'common/space/delRepeatSpace',
    sortIndex: 540,
    func: function(text) {
        return text.replace(/( |\t){2,}/g, '$1');
    }
});

Typograf.rule({
    title: 'Удаление пробелов в конце строк',
    name: 'common/space/delTrailingBlanks',
    sortIndex: 505,
    func: function(text) {
        return text.replace(/( |\t)+\n/g, '\n');
    }
});

Typograf.rule({
    title: 'Замена табов на пробелы',
    name: 'common/space/replaceTab',
    sortIndex: 510,
    func: function(text) {
        return text.replace(/\t/g, ' ');
    }
});

Typograf.rule({
    title: 'Удаление пробелов в начале и в конце текста',
    name: 'common/space/trim',
    sortIndex: 530,
    func: function(text) {
        return text.trim();
    }
});

Typograf.rule({
    title: '-> → →, <- → ←',
    name: 'common/sym/arrow',
    sortIndex: 1130,
    func: function(text) {
        return text.replace(/(^|[^-])->(?!>)/g, '$1→').replace(/(^|[^<])<-(?!-)/g, '$1←');
    }
});

Typograf.rule({
    title: 'Удаление лишних точек и пробелов в вв.',
    name: 'common/sym/cc',
    sortIndex: 1090,
    func: function(text) {
        text = text.replace(/(^|\d|V|I|X) ?в(в)?( |,|;|\n|$)/g, '$1\u00A0в$2.$3');

        return text.replace(/(^|\d|[IVX]) ?в\.? ?в\./g, '$1\u00A0вв.');
    }
});

Typograf.rule({
    title: 'Добавление ° к C и F',
    name: 'common/sym/cf',
    sortIndex: 1020,
    func: function(text) {
        var re = new RegExp('(\\d+)( |\u00A0)?(C|F)([\\W \\.,:\\!\\?"\\]\\)]|$)', 'g');

        return text.replace(re, '$1' + '\u2009' + '°$3$4');
    }
});

Typograf.rule({
    title: '(c) → ©, (tm) → ©, (r) → ™',
    name: 'common/sym/copy',
    sortIndex: 10,
    func: function(text) {
        return text.replace(/\(r\)/gi, '®')
            .replace(/(copyright )?\((c|с)\)/gi, '©')
            .replace(/\(tm\)/gi, '™');
    }
});

Typograf.rule({
    title: '1/2 → ½, 1/4 → ¼, 3/3 → ¾',
    name: 'common/sym/fraction',
    sortIndex: 1120,
    func: function(text) {
        return text.replace(/(^|\D)1\/2(\D|$)/g, '$1½$2')
            .replace(/(^|\D)1\/4(\D|$)/g, '$1¼$2')
            .replace(/(^|\D)3\/4(\D|$)/g, '$1¾$2');
    }
});

Typograf.rule({
    title: '... → …', 
    name: 'common/sym/hellip', 
    sortIndex: 20, 
    func: function(text) {
        return text.replace(/(^|[^.])\.{3,4}([^.]|$)/g, '$1…$2');
    }
});

Typograf.rule({
    title: '+- → ±',
    name: 'common/sym/plusMinus',
    sortIndex: 1010,
    func: function(text) {
        var re = new RegExp('(^| |\\>|\u00A0)\\+-(\\d)', 'g');
        return text.replace(re, '$1±$2').replace(/(^\s*)\+-(\s*$)/g, '$1±$2');
    }
});

Typograf.rule({
    title: 'x → ×',
    name: 'common/sym/times',
    sortIndex: 1050,
    func: function(text) {
        return text.replace(/(\d) ?(x|х) ?(\d)/g, '$1×$3');
    }
});

(function() {

var before = '(^| |\\n)',
    after = '( |,|\\.|\\?|\\:|\\!|$)';

Typograf.rule({
    title: 'Дефис перед то, либо, нибудь, ка, де, кась',
    name: 'ru/dash/to',
    sortIndex: 30,
    func: function(text) {
        var re = new RegExp('( | ?- ?)(то|либо|нибудь|ка|де|кась)' + after, 'g');
        return text.replace(re, '-$2$3');
    }
});

Typograf.rule({
    title: 'Дефис между из-за',
    name: 'ru/dash/izza',
    sortIndex: 33,
    func: function(text) {
        var re = new RegExp(before + '(И|и)з за' + after, 'g');
        return text.replace(re, '$1$2з-за$3');
    }
});

Typograf.rule({
    title: 'Дефис между из-под',
    name: 'ru/dash/izpod',
    sortIndex: 35,
    func: function(text) {
        var re = new RegExp(before + '(И|и)з под' + after, 'g');
        return text.replace(re, '$1$2з-под$3');
    }
});

Typograf.rule({
    title: 'Дефис после кое и кой',
    name: 'ru/dash/koe',
    sortIndex: 38,
    func: function(text) {
        var re = new RegExp(before + '(К|к)ое\\s([а-яё]{3,})' + after, 'g');
        text = text.replace(re, '$1$2ое-$3$4');
        
        var re2 = new RegExp(before + '(К|к)ой\\s([а-я]{3,})' + after, 'g');
        return text.replace(re2, '$1$2ой-$3$4');
    }
});

Typograf.rule({
    title: 'Дефис между верно-таки и т.д.',
    name: 'ru/dash/taki',
    sortIndex: 39,
    func: function(text) {
        var re = new RegExp('(верно|довольно|опять|прямо|так|всё|действительно|неужели)\\s(таки)' + after, 'g');
        return text.replace(re, '$1-$2$3');
    }
});

})();

Typograf.rule({
    title: 'Дефис на тире',
    name: 'ru/dash/main',
    sortIndex: 620,
    func: function(text) {
        var dashes = '(-|--|–|—)',
            re1 = new RegExp('( |\u00A0)' + dashes + '( |\\n)', 'g'),
            re2 = new RegExp('(X|I|V)(?: |\u00A0)?' + dashes + '(?: |\u00A0)?(X|I|V)', 'g');
        
        return text
            .replace(re1, '\u00A0' + this.setting('ru/dash/main', 'dash') + '$3')
            .replace(re2, '$1' + this.setting('ru/dash/main', 'dashInterval') + '$3');
    },
    settings: {
        dash: '\u2014', // &mdash;
        dashInterval: '\u2014' // &mdash;
    }
});

Typograf.rule({
    title: 'Дефис между месяцами',
    name: 'ru/dash/month',
    sortIndex: 610,
    func: function(text) {
        var part = '(' + this.data['ru/month'].join('|') + ')',
            re = new RegExp(part + ' ?(-|—) ?' + part, 'gi');

        return text.replace(re, '$1' + this.setting('ru/dash/main', 'dashInterval') + '$3');
    }
});

Typograf.rule({
    title: 'Дефис между днями недели',
    name: 'ru/dash/weekday',
    sortIndex: 600,
    func: function(text) {
        var part = '(' + this.data['ru/weekday'].join('|') + ')',
            re = new RegExp(part + ' ?(-|—) ?' + part, 'gi');

        return text.replace(re, '$1' + this.setting('ru/dash/main', 'dashInterval') + '$3');
    }
});

Typograf.rule({
    title: 'Преобразование дат к виду DD.MM.YYYY',
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
    title: '2 Мая, Понедельник → 2 мая, понедельник',
    name: 'ru/date/weekday',
    sortIndex: 1310,
    func: function(text) {
        var space = '( |\u00A0)',
            monthCase = this.data['ru/monthCase'].join('|'),
            weekday = this.data['ru/weekday'].join('|'),
            re = new RegExp('(\\d)' + space + '(' + monthCase + '),' + space + '(' + weekday + ')', 'gi');

        return text.replace(re, function() {
            var a = arguments;
            return a[1] + a[2] + a[3].toLowerCase() + ',' + a[4] + a[5].toLowerCase();
        });
    }
});

Typograf.rule({
    title: '$100 → 100 $',
    name: 'ru/money/dollar',
    sortIndex: 1140,
    func: function(text) {
        var re1 = new RegExp('(^|[\\D]{2,})\\$ ?([\\d.,]+)', 'g'),
            re2 = new RegExp('(^|[\\D])([\\d.,]+) ?\\$'),
            rep = '$1$2\u00A0$';

        return text
            .replace(re1, rep)
            .replace(re2, rep);
    }
});

Typograf.rule({
    title: '€100 → 100 €',
    name: 'ru/money/euro',
    sortIndex: 1140,
    func: function(text) {
        var re1 = new RegExp('(^|[\\D]{2,})€ ?([\\d.]+)', 'g'),
            re2 = new RegExp('(^|[\\D])([\\d.,]+) ?€'),
            rep = '$1$2\u00A0€';

        return text
            .replace(re1, rep)
            .replace(re2, rep);
    }
});

Typograf.rule({
    title: '1 руб. → 1 ₽',
    name: 'ru/money/ruble',
    sortIndex: 1145,
    func: function(text) {
        var rep = '$1\u00A0₽';
        return text
            .replace(/^(\d+)( |\u00A0)?(р|руб)\.$/, rep)
            .replace(/(\d+)( |\u00A0)?(р|руб)\.(?=[!?,:;])/g, rep)
            .replace(/(\d+)( |\u00A0)?(р|руб)\.(?=\s+[A-ЯЁ])/g, rep + '.');
    },
    enabled: false
});

Typograf.rule({
    title: 'Неразрывный пробел после № и §',
    name: 'ru/nbsp/afterNum',
    sortIndex: 610,
    func: function(text) {
        return text.replace(/№ ?(\d)/g, '№\u00A0$1').replace(/§ ?(\d|I|V|X)/g, '§\u00A0$1');
    }
});

Typograf.rule({
    title: 'Неразрывный пробел после короткого слова',
    name: 'ru/nbsp/afterShortWord', 
    sortIndex: 590,
    func: function(text, settings) {
        var len = settings.lengthShortWord,
        re = new RegExp('( [а-яёА-ЯЁ]{1,' + len + '}) ', 'g');

        return text.replace(re, '$1\u00A0');
    },
    settings: {
        lengthShortWord: 2
    }
});

Typograf.rule({
    title: 'Неразрывный пробел перед ли, ль, же, бы, б',
    name: 'ru/nbsp/beforeParticle',
    sortIndex: 570,
    func: function(text) {
        return text.replace(/ (ли|ль|же|ж|бы|б)([^а-яёА-ЯЁ])/g, '\u00A0$1$2');
    }
});

Typograf.rule({
    title: 'Неразрывный пробел перед последним коротким словом в предложении',
    name: 'ru/nbsp/beforeShortLastWord',
    sortIndex: 620,
    func: function(text, settings) {
        var len = settings.lengthLastWord,
            re = new RegExp(' ([а-яёА-ЯЁ]{1,' + len + '})(\\.|\\?|:|!|,)', 'g');

        return text.replace(re, '\u00A0$1$2');
    },
    settings: {
        lengthLastWord: 3
    }
});

Typograf.rule({
    title: 'Расстановка запятых и неразрывного пробела перед а и но',
    name: 'ru/nbsp/but',
    sortIndex: 1110,
    func: function(text) {
        var re = new RegExp('([,])?( |\u00A0|\n)(а|но)( |\u00A0|\n)', 'g');
        return text.replace(re, ',$2$3$4');
    }
});

Typograf.rule({
    title: 'm2 → м², m3 → м³ и неразрывный пробел',
    name: 'ru/nbsp/m',
    sortIndex: 1030,
    func: function(text) {
        var m = '(км|м|дм|см|мм)',
            re2 = new RegExp('(^|\\D)(\\d+) ?' + m + '2(\\D|$)', 'g'),
            re3 = new RegExp('(^|\\D)(\\d+) ?' + m + '3(\\D|$)', 'g');

        text = text.replace(re2, '$1$2\u00A0$3²$4');
        
        return text.replace(re3, '$1$2\u00A0$3³$4');
    }
});

Typograf.rule({
    title: 'Неразрывный пробел после OOO или ОАО',
    name: 'ru/nbsp/ooo',
    sortIndex: 1100,
    func: function(text) {
        return text.replace(/(ООО|ОАО) /g, '$1\u00A0');
    }
});

Typograf.rule({
    title: 'Неразрывный пробел после XXXX',
    name: 'ru/nbsp/xxxx',
    sortIndex: 1060,
    func: function(text) {
        return text.replace(/(^|\D)(\d{4}) ?г( |,|;|\.|\n|$)/g, '$1$2\u00A0г$3');
    }
});

Typograf.rule({
    title: 'г.г. → гг. и неразрывный пробел',
    name: 'ru/nbsp/yy',
    sortIndex: 1080,
    func: function(text) {
        return text.replace(/(^|\d) ?г\. ?г\./g, '$1\u00A0гг.');
    }
});

Typograf._sortRules();
Typograf._needSortRules = true;
