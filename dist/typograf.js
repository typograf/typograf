/*! Typograf | (c) 2014 Denis Seleznev | https://github.com/hcodes/typograf/ */

/**
* @constructor
*/

function Typograf(prefs) {
    this._prefs = typeof prefs === 'object' ? prefs : {};

    this._settings = {};
    this._enabledRules = {};

    this._rules.forEach(function(rule) {
        this._settings[rule.name] = rule.settings || {};
        this._enabledRules[rule.name] = rule.enabled;
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
    * @return {string}
    */
    execute: function(text) {
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
            if(this.enabled(rule.name)) {
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
            return this._settings[rule] ? this._settings[rule][name] : undefined;
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
                var re = new RegExp(entity[2], 'g');
                text = text.replace(re, entity[index]);
            }, this);
        }

        return text;
    }
};

if(typeof exports === 'object') {
    module.exports = Typograf;
}

Typograf.prototype.entities = [
    ['\\&nbsp;', '\\&\\#160;', '\u00A0'],
    ['\\&iexcl;', '\\&\\#161;', '\u00A1'],
    ['\\&cent;', '\\&\\#162;', '\u00A2'],
    ['\\&pound;', '\\&\\#163;', '\u00A3'],
    ['\\&curren;', '\\&\\#164;', '\u00A4'],
    ['\\&yen;', '\\&\\#165;', '\u00A5'],
    ['\\&brvbar;', '\\&\\#166;', '\u00A6'],
    ['\\&sect;', '\\&\\#167;', '\u00A7'],
    ['\\&uml;', '\\&\\#168;', '\u00A8'],
    ['\\&copy;', '\\&\\#169;', '\u00A9'],
    ['\\&ordf;', '\\&\\#170;', '\u00AA'],
    ['\\&laquo;', '\\&\\#171;', '\u00AB'],
    ['\\&not;', '\\&\\#172;', '\u00AC'],
    ['\\&shy;', '\\&\\#173;', '\u00AD'],
    ['\\&reg;', '\\&\\#174;', '\u00AE'],
    ['\\&macr;', '\\&\\#175;', '\u00AF'],
    ['\\&deg;', '\\&\\#176;', '\u00B0'],
    ['\\&plusmn;', '\\&\\#177;', '\u00B1'],
    ['\\&sup2;', '\\&\\#178;', '\u00B2'],
    ['\\&sup3;', '\\&\\#179;', '\u00B3'],
    ['\\&acute;', '\\&\\#180;', '\u00B4'],
    ['\\&micro;', '\\&\\#181;', '\u00B5'],
    ['\\&para;', '\\&\\#182;', '\u00B6'],
    ['\\&middot;', '\\&\\#183;', '\u00B7'],
    ['\\&cedil;', '\\&\\#184;', '\u00B8'],
    ['\\&sup1;', '\\&\\#185;', '\u00B9'],
    ['\\&ordm;', '\\&\\#186;', '\u00BA'],
    ['\\&raquo;', '\\&\\#187;', '\u00BB'],
    ['\\&frac14;', '\\&\\#188;', '\u00BC'],
    ['\\&frac12;', '\\&\\#189;', '\u00BD'],
    ['\\&frac34;', '\\&\\#190;', '\u00BE'],
    ['\\&iquest;', '\\&\\#191;', '\u00BF'],
    ['\\&Agrave;', '\\&\\#192;', '\u00C0'],
    ['\\&Aacute;', '\\&\\#193;', '\u00C1'],
    ['\\&Acirc;', '\\&\\#194;', '\u00C2'],
    ['\\&Atilde;', '\\&\\#195;', '\u00C3'],
    ['\\&Auml;', '\\&\\#196;', '\u00C4'],
    ['\\&Aring;', '\\&\\#197;', '\u00C5'],
    ['\\&AElig;', '\\&\\#198;', '\u00C6'],
    ['\\&Ccedil;', '\\&\\#199;', '\u00C7'],
    ['\\&Egrave;', '\\&\\#200;', '\u00C8'],
    ['\\&Eacute;', '\\&\\#201;', '\u00C9'],
    ['\\&Ecirc;', '\\&\\#202;', '\u00CA'],
    ['\\&Euml;', '\\&\\#203;', '\u00CB'],
    ['\\&Igrave;', '\\&\\#204;', '\u00CC'],
    ['\\&Iacute;', '\\&\\#205;', '\u00CD'],
    ['\\&Icirc;', '\\&\\#206;', '\u00CE'],
    ['\\&Iuml;', '\\&\\#207;', '\u00CF'],
    ['\\&ETH;', '\\&\\#208;', '\u00D0'],
    ['\\&Ntilde;', '\\&\\#209;', '\u00D1'],
    ['\\&Ograve;', '\\&\\#210;', '\u00D2'],
    ['\\&Oacute;', '\\&\\#211;', '\u00D3'],
    ['\\&Ocirc;', '\\&\\#212;', '\u00D4'],
    ['\\&Otilde;', '\\&\\#213;', '\u00D5'],
    ['\\&Ouml;', '\\&\\#214;', '\u00D6'],
    ['\\&times;', '\\&\\#215;', '\u00D7'],
    ['\\&Oslash;', '\\&\\#216;', '\u00D8'],
    ['\\&Ugrave;', '\\&\\#217;', '\u00D9'],
    ['\\&Uacute;', '\\&\\#218;', '\u00DA'],
    ['\\&Ucirc;', '\\&\\#219;', '\u00DB'],
    ['\\&Uuml;', '\\&\\#220;', '\u00DC'],
    ['\\&Yacute;', '\\&\\#221;', '\u00DD'],
    ['\\&THORN;', '\\&\\#222;', '\u00DE'],
    ['\\&szlig;', '\\&\\#223;', '\u00DF'],
    ['\\&agrave;', '\\&\\#224;', '\u00E0'],
    ['\\&aacute;', '\\&\\#225;', '\u00E1'],
    ['\\&acirc;', '\\&\\#226;', '\u00E2'],
    ['\\&atilde;', '\\&\\#227;', '\u00E3'],
    ['\\&auml;', '\\&\\#228;', '\u00E4'],
    ['\\&aring;', '\\&\\#229;', '\u00E5'],
    ['\\&aelig;', '\\&\\#230;', '\u00E6'],
    ['\\&ccedil;', '\\&\\#231;', '\u00E7'],
    ['\\&egrave;', '\\&\\#232;', '\u00E8'],
    ['\\&eacute;', '\\&\\#233;', '\u00E9'],
    ['\\&ecirc;', '\\&\\#234;', '\u00EA'],
    ['\\&euml;', '\\&\\#235;', '\u00EB'],
    ['\\&igrave;', '\\&\\#236;', '\u00EC'],
    ['\\&iacute;', '\\&\\#237;', '\u00ED'],
    ['\\&icirc;', '\\&\\#238;', '\u00EE'],
    ['\\&iuml;', '\\&\\#239;', '\u00EF'],
    ['\\&eth;', '\\&\\#240;', '\u00F0'],
    ['\\&ntilde;', '\\&\\#241;', '\u00F1'],
    ['\\&ograve;', '\\&\\#242;', '\u00F2'],
    ['\\&oacute;', '\\&\\#243;', '\u00F3'],
    ['\\&ocirc;', '\\&\\#244;', '\u00F4'],
    ['\\&otilde;', '\\&\\#245;', '\u00F5'],
    ['\\&ouml;', '\\&\\#246;', '\u00F6'],
    ['\\&divide;', '\\&\\#247;', '\u00F7'],
    ['\\&oslash;', '\\&\\#248;', '\u00F8'],
    ['\\&ugrave;', '\\&\\#249;', '\u00F9'],
    ['\\&uacute;', '\\&\\#250;', '\u00FA'],
    ['\\&ucirc;', '\\&\\#251;', '\u00FB'],
    ['\\&uuml;', '\\&\\#252;', '\u00FC'],
    ['\\&yacute;', '\\&\\#253;', '\u00FD'],
    ['\\&thorn;', '\\&\\#254;', '\u00FE'],
    ['\\&yuml;', '\\&\\#255;', '\u00FF'],
    ['\\&fnof;', '\\&\\#402;', '\u0192'],
    ['\\&Alpha;', '\\&\\#913;', '\u0391'],
    ['\\&Beta;', '\\&\\#914;', '\u0392'],
    ['\\&Gamma;', '\\&\\#915;', '\u0393'],
    ['\\&Delta;', '\\&\\#916;', '\u0394'],
    ['\\&Epsilon;', '\\&\\#917;', '\u0395'],
    ['\\&Zeta;', '\\&\\#918;', '\u0396'],
    ['\\&Eta;', '\\&\\#919;', '\u0397'],
    ['\\&Theta;', '\\&\\#920;', '\u0398'],
    ['\\&Iota;', '\\&\\#921;', '\u0399'],
    ['\\&Kappa;', '\\&\\#922;', '\u039A'],
    ['\\&Lambda;', '\\&\\#923;', '\u039B'],
    ['\\&Mu;', '\\&\\#924;', '\u039C'],
    ['\\&Nu;', '\\&\\#925;', '\u039D'],
    ['\\&Xi;', '\\&\\#926;', '\u039E'],
    ['\\&Omicron;', '\\&\\#927;', '\u039F'],
    ['\\&Pi;', '\\&\\#928;', '\u03A0'],
    ['\\&Rho;', '\\&\\#929;', '\u03A1'],
    ['\\&Sigma;', '\\&\\#931;', '\u03A3'],
    ['\\&Tau;', '\\&\\#932;', '\u03A4'],
    ['\\&Upsilon;', '\\&\\#933;', '\u03A5'],
    ['\\&Phi;', '\\&\\#934;', '\u03A6'],
    ['\\&Chi;', '\\&\\#935;', '\u03A7'],
    ['\\&Psi;', '\\&\\#936;', '\u03A8'],
    ['\\&Omega;', '\\&\\#937;', '\u03A9'],
    ['\\&alpha;', '\\&\\#945;', '\u03B1'],
    ['\\&beta;', '\\&\\#946;', '\u03B2'],
    ['\\&gamma;', '\\&\\#947;', '\u03B3'],
    ['\\&delta;', '\\&\\#948;', '\u03B4'],
    ['\\&epsilon;', '\\&\\#949;', '\u03B5'],
    ['\\&zeta;', '\\&\\#950;', '\u03B6'],
    ['\\&eta;', '\\&\\#951;', '\u03B7'],
    ['\\&theta;', '\\&\\#952;', '\u03B8'],
    ['\\&iota;', '\\&\\#953;', '\u03B9'],
    ['\\&kappa;', '\\&\\#954;', '\u03BA'],
    ['\\&lambda;', '\\&\\#955;', '\u03BB'],
    ['\\&mu;', '\\&\\#956;', '\u03BC'],
    ['\\&nu;', '\\&\\#957;', '\u03BD'],
    ['\\&xi;', '\\&\\#958;', '\u03BE'],
    ['\\&omicron;', '\\&\\#959;', '\u03BF'],
    ['\\&pi;', '\\&\\#960;', '\u03C0'],
    ['\\&rho;', '\\&\\#961;', '\u03C1'],
    ['\\&sigmaf;', '\\&\\#962;', '\u03C2'],
    ['\\&sigma;', '\\&\\#963;', '\u03C3'],
    ['\\&tau;', '\\&\\#964;', '\u03C4'],
    ['\\&upsilon;', '\\&\\#965;', '\u03C5'],
    ['\\&phi;', '\\&\\#966;', '\u03C6'],
    ['\\&chi;', '\\&\\#967;', '\u03C7'],
    ['\\&psi;', '\\&\\#968;', '\u03C8'],
    ['\\&omega;', '\\&\\#969;', '\u03C9'],
    ['\\&thetasym;', '\\&\\#977;', '\u03D1'],
    ['\\&upsih;', '\\&\\#978;', '\u03D2'],
    ['\\&piv;', '\\&\\#982;', '\u03D6'],
    ['\\&bull;', '\\&\\#8226;', '\u2022'],
    ['\\&hellip;', '\\&\\#8230;', '\u2026'],
    ['\\&prime;', '\\&\\#8242;', '\u2032'],
    ['\\&Prime;', '\\&\\#8243;', '\u2033'],
    ['\\&oline;', '\\&\\#8254;', '\u203E'],
    ['\\&frasl;', '\\&\\#8260;', '\u2044'],
    ['\\&weierp;', '\\&\\#8472;', '\u2118'],
    ['\\&image;', '\\&\\#8465;', '\u2111'],
    ['\\&real;', '\\&\\#8476;', '\u211C'],
    ['\\&trade;', '\\&\\#8482;', '\u2122'],
    ['\\&alefsym;', '\\&\\#8501;', '\u2135'],
    ['\\&larr;', '\\&\\#8592;', '\u2190'],
    ['\\&uarr;', '\\&\\#8593;', '\u2191'],
    ['\\&rarr;', '\\&\\#8594;', '\u2192'],
    ['\\&darr;', '\\&\\#8595;', '\u2193'],
    ['\\&harr;', '\\&\\#8596;', '\u2194'],
    ['\\&crarr;', '\\&\\#8629;', '\u21B5'],
    ['\\&lArr;', '\\&\\#8656;', '\u21D0'],
    ['\\&uArr;', '\\&\\#8657;', '\u21D1'],
    ['\\&rArr;', '\\&\\#8658;', '\u21D2'],
    ['\\&dArr;', '\\&\\#8659;', '\u21D3'],
    ['\\&hArr;', '\\&\\#8660;', '\u21D4'],
    ['\\&forall;', '\\&\\#8704;', '\u2200'],
    ['\\&part;', '\\&\\#8706;', '\u2202'],
    ['\\&exist;', '\\&\\#8707;', '\u2203'],
    ['\\&empty;', '\\&\\#8709;', '\u2205'],
    ['\\&nabla;', '\\&\\#8711;', '\u2207'],
    ['\\&isin;', '\\&\\#8712;', '\u2208'],
    ['\\&notin;', '\\&\\#8713;', '\u2209'],
    ['\\&ni;', '\\&\\#8715;', '\u220B'],
    ['\\&prod;', '\\&\\#8719;', '\u220F'],
    ['\\&sum;', '\\&\\#8721;', '\u2211'],
    ['\\&minus;', '\\&\\#8722;', '\u2212'],
    ['\\&lowast;', '\\&\\#8727;', '\u2217'],
    ['\\&radic;', '\\&\\#8730;', '\u221A'],
    ['\\&prop;', '\\&\\#8733;', '\u221D'],
    ['\\&infin;', '\\&\\#8734;', '\u221E'],
    ['\\&ang;', '\\&\\#8736;', '\u2220'],
    ['\\&and;', '\\&\\#8743;', '\u2227'],
    ['\\&or;', '\\&\\#8744;', '\u2228'],
    ['\\&cap;', '\\&\\#8745;', '\u2229'],
    ['\\&cup;', '\\&\\#8746;', '\u222A'],
    ['\\&int;', '\\&\\#8747;', '\u222B'],
    ['\\&there4;', '\\&\\#8756;', '\u2234'],
    ['\\&sim;', '\\&\\#8764;', '\u223C'],
    ['\\&cong;', '\\&\\#8773;', '\u2245'],
    ['\\&asymp;', '\\&\\#8776;', '\u2248'],
    ['\\&ne;', '\\&\\#8800;', '\u2260'],
    ['\\&equiv;', '\\&\\#8801;', '\u2261'],
    ['\\&le;', '\\&\\#8804;', '\u2264'],
    ['\\&ge;', '\\&\\#8805;', '\u2265'],
    ['\\&sub;', '\\&\\#8834;', '\u2282'],
    ['\\&sup;', '\\&\\#8835;', '\u2283'],
    ['\\&nsub;', '\\&\\#8836;', '\u2284'],
    ['\\&sube;', '\\&\\#8838;', '\u2286'],
    ['\\&supe;', '\\&\\#8839;', '\u2287'],
    ['\\&oplus;', '\\&\\#8853;', '\u2295'],
    ['\\&otimes;', '\\&\\#8855;', '\u2297'],
    ['\\&perp;', '\\&\\#8869;', '\u22A5'],
    ['\\&sdot;', '\\&\\#8901;', '\u22C5'],
    ['\\&lceil;', '\\&\\#8968;', '\u2308'],
    ['\\&rceil;', '\\&\\#8969;', '\u2309'],
    ['\\&lfloor;', '\\&\\#8970;', '\u230A'],
    ['\\&rfloor;', '\\&\\#8971;', '\u230B'],
    ['\\&lang;', '\\&\\#9001;', '\u2329'],
    ['\\&rang;', '\\&\\#9002;', '\u232A'],
    ['\\&spades;', '\\&\\#9824;', '\u2660'],
    ['\\&clubs;', '\\&\\#9827;', '\u2663'],
    ['\\&hearts;', '\\&\\#9829;', '\u2665'],
    ['\\&diams;', '\\&\\#9830;', '\u2666'],
    ['\\&loz;', '\\&\\#9674;', '\u25CA'],
    ['\\&OElig;', '\\&\\#338;', '\u0152'],
    ['\\&oelig;', '\\&\\#339;', '\u0153'],
    ['\\&Scaron;', '\\&\\#352;', '\u0160'],
    ['\\&scaron;', '\\&\\#353;', '\u0161'],
    ['\\&Yuml;', '\\&\\#376;', '\u0178'],
    ['\\&circ;', '\\&\\#710;', '\u02C6'],
    ['\\&tilde;', '\\&\\#732;', '\u02DC'],
    ['\\&ensp;', '\\&\\#8194;', '\u2002'],
    ['\\&emsp;', '\\&\\#8195;', '\u2003'],
    ['\\&thinsp;', '\\&\\#8201;', '\u2009'],
    ['\\&zwnj;', '\\&\\#8204;', '\u200C'],
    ['\\&zwj;', '\\&\\#8205;', '\u200D'],
    ['\\&lrm;', '\\&\\#8206;', '\u200E'],
    ['\\&rlm;', '\\&\\#8207;', '\u200F'],
    ['\\&ndash;', '\\&\\#8211;', '\u2013'],
    ['\\&mdash;', '\\&\\#8212;', '\u2014'],
    ['\\&lsquo;', '\\&\\#8216;', '\u2018'],
    ['\\&rsquo;', '\\&\\#8217;', '\u2019'],
    ['\\&sbquo;', '\\&\\#8218;', '\u201A'],
    ['\\&ldquo;', '\\&\\#8220;', '\u201C'],
    ['\\&rdquo;', '\\&\\#8221;', '\u201D'],
    ['\\&bdquo;', '\\&\\#8222;', '\u201E'],
    ['\\&dagger;', '\\&\\#8224;', '\u2020'],
    ['\\&Dagger;', '\\&\\#8225;', '\u2021'],
    ['\\&permil;', '\\&\\#8240;', '\u2030'],
    ['\\&lsaquo;', '\\&\\#8249;', '\u2039'],
    ['\\&rsaquo;', '\\&\\#8250;', '\u203A'],
    ['\\&euro;', '\\&\\#8364;', '\u20AC']
];

Typograf.prototype.entities.forEach(function(en) {
    en[3] = new RegExp('(' + en[0] + '|' + en[1] + ')', 'g');
}, this);

Typograf.data('month', [
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

Typograf.data('weekday', [
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
    name: 'delDoublePunctiation',
    sortIndex: 580,
    func: function(text) {
        return text.replace(/(,|:|;|\?){2,}/g, '$1');
    }
});

Typograf.rule({
    title: '!! → !',
    name: 'exclamation',
    sortIndex: 1150,
    func: function(text) {
        return text
            .replace(/(^|[^!])\!{2}($|[^!])/, '$1!$2')
            .replace(/(^|[^!])\!{4}?($|[^!])/, '$1!!!$2');
    }
});

Typograf.rule({
    title: '!? → ?!',
    name: 'exclamationQuestion',
    sortIndex: 1140,
    func: function(text) {
        var re = new RegExp('(^|[^!])!\\?([^?]|$)', 'g');
        return text.replace(re, '$1?!$2');
    }
});

Typograf.rule({
    title: 'Расстановка кавычек',
    name: 'quot',
    sortIndex: 700,
    func: function(text, settings) {
        var letter = '[\\w\\dа-яёА-ЯЁ]',
            lquot = settings.lquot,
            rquot = settings.rquot,
            lquot2 = settings.lquot2,
            rquot2 = settings.rquot2,
            tag = '(?:^|<\\w.*?>)*',
            phraseL = '(?:…|' + letter + '|\\n)',
            phraseR = '(?:' + [letter, '[)!?.:;#*]'].join('|') + ')*',
            quotesL = '(«|»|„|“|”|‘|’|&quot;|")',
            quotesR = '(»|“|&quot;|")',
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

(function() {

var before = '(^| |\\n)',
    after = '( |,|\\.|\\?|\\:|\\!|$)';

Typograf.rule({
    title: 'Дефис перед то, либо, нибудь, ка, де, кась',
    name: 'dash/to',
    sortIndex: 30,
    func: function(text) {
        var re = new RegExp('( | ?- ?)(то|либо|нибудь|ка|де|кась)' + after, 'g');
        return text.replace(re, '-$2$3');
    }
});

Typograf.rule({
    title: 'Дефис между из-за',
    name: 'dash/izza',
    sortIndex: 33,
    func: function(text) {
        var re = new RegExp(before + '(И|и)з за' + after, 'g');
        return text.replace(re, '$1$2з-за$3');
    }
});

Typograf.rule({
    title: 'Дефис между из-под',
    name: 'dash/izpod',
    sortIndex: 35,
    func: function(text) {
        var re = new RegExp(before + '(И|и)з под' + after, 'g');
        return text.replace(re, '$1$2з-под$3');
    }
});

Typograf.rule({
    title: 'Дефис после кое и кой',
    name: 'dash/koe',
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
    name: 'dash/taki',
    sortIndex: 39,
    func: function(text) {
        var re = new RegExp('(верно|довольно|опять|прямо|так|всё|действительно|неужели)\\s(таки)' + after, 'g');
        return text.replace(re, '$1-$2$3');
    }
});

})();

Typograf.rule({
    title: 'Дефис на тире',
    name: 'dash/main',
    sortIndex: 620,
    func: function(text) {
        var re = new RegExp('(\\s|\u00A0)(-|—)(\\s|\\n)', 'g');
        
        return text
            .replace(re, '\u00A0—$3')
            .replace(/(X|I|V)(?: |\u00A0)?(-|—)(?: |\u00A0)?(X|I|V)/g, '$1—$3');
    },
    settings: {
        dash: '\u2014',
        dashInterval: '\u2014'
    }
});

Typograf.rule({
    title: 'Дефис между месяцами',
    name: 'dash/month',
    sortIndex: 610,
    func: function(text) {
        var part = '(' + this.data.month.join('|') + ')',
            re = new RegExp(part + ' ?(-|—) ?' + part, 'gi');

        return text.replace(re, '$1' + this.setting('dash/main', 'dashInterval') + '$3');
    }
});

Typograf.rule({
    title: 'Дефис между днями недели',
    name: 'dash/weekday',
    sortIndex: 600,
    func: function(text) {
        var part = '(' + this.data.weekday.join('|') + ')',
            re = new RegExp(part + ' ?(-|—) ?' + part, 'gi');

        return text.replace(re, '$1' + this.setting('dash/main', 'dashInterval') + '$3');
    }
});

Typograf.rule({
    title: 'Преобразование дат к виду DD.MM.YYYY',
    name: 'date/main',
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
    title: 'Замена перевода строки на <br/>',
    name: 'html/nbr',
    sortIndex: 710,
    func: function(text) {
        return text.replace(/\n/g, '<br/>');
    },
    enabled: false
});

Typograf.rule({
    title: 'Расстановка <p> и <br/>',
    name: 'html/pbr',
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
    name: 'html/stripTags',
    sortIndex: 5,
    func: function(text) {
        return text.replace(/<\/?[^>]+>/g, '');
    },
    enabled: false
});

Typograf.rule({
    title: 'Расстановка ссылок',
    name: 'html/url',
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
    title: '$100 → 100 $',
    name: 'money/dollar',
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
    name: 'money/euro',
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
    title: 'Неразрывный пробел после № и §',
    name: 'nbsp/afterNum',
    sortIndex: 610,
    func: function(text) {
        return text.replace(/№ ?(\d)/g, '№\u00A0$1').replace(/§ ?(\d|I|V|X)/g, '§\u00A0$1');
    }
});

Typograf.rule({
    title: 'Неразрывный пробел после короткого слова',
    name: 'nbsp/afterShortWord', 
    sortIndex: 590,
    func: function(text, settings) {
        var len = settings.lengthShortWord,
        re = new RegExp('( [а-яёА-ЯЁ\\w]{1,' + len + '}) ', 'g');

        return len > 0 ? text.replace(re, '$1\u00A0') : text;
    },
    settings: {
        lengthShortWord: 2
    }
});

Typograf.rule({
    title: 'Неразрывный пробел перед ли, ль, же, бы, б',
    name: 'nbsp/beforeParticle',
    sortIndex: 570,
    func: function(text) {
        return text.replace(/ (ли|ль|же|ж|бы|б)([^а-яёА-ЯЁ])/g, '\u00A0$1$2');
    }
});

Typograf.rule({
    title: 'Неразрывный пробел перед последним коротким словом в предложении',
    name: 'nbsp/beforeShortLastWord',
    sortIndex: 620,
    func: function(text, settings) {
        var len = settings.lengthLastWord,
            re = new RegExp(' ([а-яёА-ЯЁ\\w]{1,' + len + '})(\\.|\\?|:|!|,)', 'g');

        return len > 0 ? text.replace(re, '\u00A0$1$2') : text;
    },
    settings: {
        lengthLastWord: 3
    }
});

Typograf.rule({
    title: 'Расстановка запятых и неразрывного пробела перед а и но',
    name: 'nbsp/but',
    sortIndex: 1110,
    func: function(text) {
        var re = new RegExp('([,])?( |\u00A0|\n)(а|но)( |\u00A0|\n)', 'g');
        return text.replace(re, ',$2$3$4');
    }
});

Typograf.rule({
    title: 'm2 → м², m3 → м³ и неразрывный пробел',
    name: 'nbsp/m',
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
    name: 'nbsp/ooo',
    sortIndex: 1100,
    func: function(text) {
        return text.replace(/(ООО|ОАО) /g, '$1\u00A0');
    }
});

Typograf.rule({
    title: 'Неразрывный пробел после XXXX',
    name: 'nbsp/xxxx',
    sortIndex: 1060,
    func: function(text) {
        return text.replace(/(^|\D)(\d{4}) ?г( |,|;|\.|\n|$)/g, '$1$2\u00A0г$3');
    }
});

Typograf.rule({
    title: 'г.г. → гг. и неразрывный пробел',
    name: 'nbsp/yy',
    sortIndex: 1080,
    func: function(text) {
        return text.replace(/(^|\d) ?г\. ?г\./g, '$1\u00A0гг.');
    }
});

Typograf.rule({
    title: 'Пробел после знаков пунктуации', 
    name: 'space/afterPunctuation', 
    sortIndex: 560, 
    func: function(text) {
        return text
            .replace(/(\!|;|\?)([^ \n\t\!;\?])/g, '$1 $2')
            .replace(/(\D)(,|\:)([^ \/\d\n\t\!;,\?\.\:])/g, '$1$2 $3');
    }
});

Typograf.rule({
    title: 'Удаление пробела перед %',
    name: 'space/delBeforePercent',
    sortIndex: 600,
    func: function(text) {
        return text.replace(/(\d)( |\u00A0)%/g, '$1%');
    }
});

Typograf.rule({
    title: 'Удаление пробелов перед знаками пунктуации',
    name: 'space/delBeforePunctuation',
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
    name: 'space/delRepeatN',
    sortIndex: 545,
    func: function(text) {
        return text.replace(/\n{3,}/g, '\n\n');
    }
});

Typograf.rule({
    title: 'Удаление повторяющихся пробелов',
    name: 'space/delRepeatSpace',
    sortIndex: 540,
    func: function(text) {
        return text.replace(/( |\t){2,}/g, '$1');
    }
});

Typograf.rule({
    title: 'Удаление пробелов в конце строк',
    name: 'space/delTrailingBlanks',
    sortIndex: 505,
    func: function(text) {
        return text.replace(/( |\t)+\n/g, '\n');
    }
});

Typograf.rule({
    title: 'Замена табов на пробелы',
    name: 'space/replaceTab',
    sortIndex: 510,
    func: function(text) {
        return text.replace(/\t/g, ' ');
    }
});

Typograf.rule({
    title: 'Удаление пробелов в начале и в конце текста',
    name: 'space/trim',
    sortIndex: 530,
    func: function(text) {
        return text.trim();
    }
});

Typograf.rule({
    title: '-> → →, <- → ←',
    name: 'sym/arrow',
    sortIndex: 1130,
    func: function(text) {
        return text.replace(/(^|[^-])->(?!>)/g, '$1→').replace(/(^|[^<])<-(?!-)/g, '$1←');
    }
});

Typograf.rule({
    title: 'Удаление лишних точек и пробелов в вв.',
    name: 'sym/cc',
    sortIndex: 1090,
    func: function(text) {
        text = text.replace(/(^|\d|V|I|X) ?в(в)?( |,|;|\n|$)/g, '$1\u00A0в$2.$3');

        return text.replace(/(^|\d|[IVX]) ?в\.? ?в\./g, '$1\u00A0вв.');
    }
});

Typograf.rule({
    title: 'Добавление ° к C и F',
    name: 'sym/cf',
    sortIndex: 1020,
    func: function(text) {
        var re = new RegExp('(\\d+)( |\u00A0)?(C|F)([\\W \\.,:\\!\\?"\\]\\)]|$)', 'g');

        return text.replace(re, '$1' + '\u2009' + '°$3$4');
    }
});

Typograf.rule({
    title: '(c) → ©, (tm) → ©, (r) → ™',
    name: 'sym/copy',
    sortIndex: 10,
    func: function(text) {
        return text.replace(/\(r\)/gi, '®')
            .replace(/\((c|с)\)/gi, '©')
            .replace(/\(tm\)/gi, '™');
    }
});

Typograf.rule({
    title: '1/2 → ½, 1/4 → ¼, 3/3 → ¾',
    name: 'sym/fraction',
    sortIndex: 1120,
    func: function(text) {
        return text.replace(/(^|\D)1\/2(\D|$)/g, '$1½$2')
            .replace(/(^|\D)1\/4(\D|$)/g, '$1¼$2')
            .replace(/(^|\D)3\/4(\D|$)/g, '$1¾$2');
    }
});

Typograf.rule({
    title: '... → …', 
    name: 'sym/hellip', 
    sortIndex: 20, 
    func: function(text) {
        return text.replace(/(^|[^.])\.{3,4}([^.]|$)/g, '$1…$2');
    }
});

Typograf.rule({
    title: '+- → ±',
    name: 'sym/plusMinus',
    sortIndex: 1010,
    func: function(text) {
        var re = new RegExp('(^| |\\>|\u00A0)\\+-(\\d)', 'g');
        return text.replace(re, '$1±$2').replace(/(^\s*)\+-(\s*$)/g, '$1±$2');
    }
});

Typograf.rule({
    title: 'x → ×',
    name: 'sym/times',
    sortIndex: 1050,
    func: function(text) {
        return text.replace(/(\d) ?(x|х) ?(\d)/g, '$1×$3');
    }
});

Typograf._sortRules();
Typograf._needSortRules = true;
