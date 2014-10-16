/*! Typograf | (c) 2014 Denis Seleznev | https://github.com/hcodes/typograf/ */

function Typograf(prefs) {
    this._prefs = typeof prefs === 'object' ? prefs : {};

    this._settings = {};
    Object.keys(this._defaultSettings).forEach(function(prop) {
        this._settings[prop] = this._defaultSettings[prop];
    }, this);

    this._enabledRules = {};
    this._rules.forEach(function(rule) {
        this._enabledRules[rule.name] = rule.enabled;
    }, this);
}

Typograf.rule = function(rule) {
    rule.enabled = rule.enabled === false ? false : true;
    
    Typograf.prototype._rules.push(rule);

    if(Typograf._needSortRules) {
        this._sortRules();
    }
};

Typograf.defaultSetting = function(name, value) {
    Typograf.prototype._defaultSettings[name] = value;
};

Typograf._sortRules = function() {
    Typograf.prototype._rules.sort(function(a, b) {
        return a.sortIndex > b.sortIndex ? 1 : -1;
    });
};

Typograf.prototype = {
    constructor: Typograf,
    execute: function(text) {
        if(!text) {
            return '';
        }
        
        var isHTML = text.search(/<|>/) !== -1;

        if(isHTML) {
            text = this._hideTags(text);
        }

        text = this._utfication(text);

        this._rules.forEach(function(rule) {
            if(this.enabled(rule.name)) {
                text = rule.callback.call(this, text);
            }
        }, this);

        text = this._modification(text);
        
        if(isHTML) {
            text = this._showTags(text);
        }

        return text;
    },
    setting: function(name, value) {
        if(arguments.length === 1) {
            return this._settings[name];
        } else {
            this._settings[name] = value;
            return this;
        }
    },
    enabled: function(rule) {
        return this._enabledRules[rule];
    },
    disabled: function(rule) {
        return !this._enabledRules[rule];
    },
    enable: function(rule) {
        this._enable(rule, true);

        return this;
    },
    disable: function(rule) {
        this._enable(rule, false);

        return this;
    },
    _enable: function(rule, enabled) {
        if(Array.isArray(rule)) {
            rule.forEach(function(el) {
                this._enabledRules[el] = enabled;
            }, this);
        } else {
            this._enabledRules[rule] = enabled;
        }
    },
    _defaultSettings: {},
    _rules: [],
    _hideTags: function(text) {
        this._hiddenTags = {};

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
            that._hiddenTags[key] = match;
            i++;
            
            return key;
        });

        return text;
    },
    _showTags: function(text) {
        Object.keys(this._hiddenTags).forEach(function(key) {
            text = text.replace(new RegExp(key, 'gim'), this._hiddenTags[key]);
        }, this);

        delete this._hiddenTags;

        return text;
    },
    _utfication: function(text) {
        this.entities.forEach(function(entity) {
            var re = new RegExp('(' + entity[0] + '|' + entity[1] + ')', 'g');
            text = text.replace(re, entity[2]);
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

Typograf.rule({
    title: '-> → →, <- → ←',
    name: 'arrow',
    sortIndex: 1130,
    func: function(text) {
        return text.replace(/->[^>]/g, '→').replace(/[^<]<-/g, '←');
    }
});

Typograf.rule({
    title: 'Добавление ° к C и F',
    name: 'cf',
    sortIndex: 1020,
    func: function(text) {
        var re = new RegExp('(\\d+)( |\u00A0)?(C|F)([\\W \\.,:\\!\\?"\\]\\)]|$)', 'g');

        return text.replace(re, '$1' + '\u2009' + '°$3$4');
    }
});

Typograf.rule({
    title: 'Удаление лишних точек и пробелов в вв.',
    name: 'cc',
    sortIndex: 1090,
    func: function(text) {
        text = text.replace(/(^|\d|V|I|X) ?в(в)?( |,|;|\n|$)/g, '$1\u00A0в$2.$3');

        return text.replace(/(^|\d|[IVX]) ?в\.? ?в\./g, '$1\u00A0вв.');
    }
});

Typograf.rule({
    title: '(c) → ©, (tm) → ©, (r) → ™',
    name: 'copy',
    sortIndex: 10,
    func: function(text) {
        return text.replace(/\(r\)/gi, '®')
            .replace(/\((c|с)\)/gi, '©')
            .replace(/\(tm\)/gi, '™');
    }
});

Typograf.rule({
    title: 'Удаление двойной пунктуации',
    name: 'del_double_punctiation',
    sortIndex: 580,
    func: function(text) {
        return text.replace(/(,|\.|\:|\!|\?){2,}/g, '$1');
    }
});

Typograf.rule({
    title: '1/2 → ½, 1/4 → ¼, 3/3 → ¾',
    name: 'fraction',
    sortIndex: 1120,
    func: function(text) {
        return text.replace(/(^|\D)1\/2(\D|$)/g, '$1½$2')
            .replace(/(^|\D)1\/4(\D|$)/g, '$1¼$2')
            .replace(/(^|\D)3\/4(\D|$)/g, '$1¾$2');
    }
});

Typograf.rule({
    title: '... → …', 
    name: 'hellip', 
    sortIndex: 20, 
    func: function(text) {
        return text.replace(/(^|[^.])\.{3,4}([^.]|$)/g, '$1…$2');
    }
});

Typograf.rule({
    title: 'Замена перевода строки на <br/>',
    name: 'nbr',
    sortIndex: 710,
    func: function(text) {
        return text.replace(/\n/g, '|<br/>');
    },
    enabled: false
});

Typograf.rule({
    title: 'Расстановка <p> и <br/>',
    name: 'pbr',
    sortIndex: 700,
    func: function(text) {
        if(text.search(/\n/) !== -1) {
            text = '<p>' + text.replace(/\n\n/g, '</p>\n<p>') + '<\/p>';
            text = text.replace(/([^>])\n/g, '$1<br />\n');
        } else {
            text = '<p>' + text + '</p>';
        }

        return text;
    },
    enabled: false
});

Typograf.rule({
    title: '+- → ±',
    name: 'plus_minus',
    sortIndex: 1010,
    func: function(text) {
        var re = new RegExp('(^| |\\>|\00uA0)\\+-(\\d)', 'g');
        return text.replace(re, '$1±$2');
    }
});

Typograf.rule({
    title: 'Расстановка кавычек',
    name: 'quot',
    sortIndex: 700,
    func: function(text) {
        return text; // TODO
    }
});

Typograf.defaultSetting('quot11', '«');
Typograf.defaultSetting('quot12', '»');
Typograf.defaultSetting('quot21', '„');
Typograf.defaultSetting('quot22', '“');

Typograf.rule({
    title: 'x → ×',
    name: 'times',
    sortIndex: 1050,
    func: function(text) {
        return text.replace(/(\d) ?(x|х) ?(\d)/g, '$1×$3');
    }
});

Typograf.rule({
    title: 'Расстановка ссылок', 
    name: 'url', 
    sortIndex: 200, 
    func: function(text) {
        var prefix = '(http|https|ftp|telnet|news|gopher|file|wais)://',
            pureUrl = '([a-zA-Z0-9\/\\n+-=%&:_.~?]+[a-zA-Z0-9#+]*)',
            re = new RegExp(prefix + pureUrl, 'g');

        return text.replace(re, '<a href="$1://$2">$1://$2</a>');
    }
});

Typograf.rule({
    title: 'Дефис на тире',
    name: 'dash',
    sortIndex: 620,
    func: function(text) {
        var re = new RegExp('( |\u00A0)(-|—)( |\\n)', 'g');
        return text.replace(re, '\u00A0—$3').replace(/(X|I|V) ?- ?(X|I|V)/g, '$1—$2');
    }
});

Typograf.defaultSetting('dashInterval', '\u2014');
Typograf.defaultSetting('dash', '\u2014');

(function() {

var before = '(^| |\\n)',
    after = '( |,|\\.|\\?|\\:|\\!|$)';

Typograf.rule({
    title: 'Дефис перед то, либо, нибудь, ка, де, кась',
    name: 'dash:to',
    sortIndex: 30,
    func: function(text) {
        var re = new RegExp('( | ?- ?)(то|либо|нибудь|ка|де|кась)' + after, 'g');
        return text.replace(re, '-$2$3');
    }
});

Typograf.rule({
    title: 'Дефис между из-за',
    name: 'dash:izza',
    sortIndex: 33,
    func: function(text) {
        var re = new RegExp(before + '(И|и)з за' + after, 'g');
        return text.replace(re, '$1$2з-за$3');
    }
});

Typograf.rule({
    title: 'Дефис между из-под',
    name: 'dash:izpod',
    sortIndex: 35,
    func: function(text) {
        var re = new RegExp(before + '(И|и)з под' + after, 'g');
        return text.replace(re, '$1$2з-под$3');
    }
});

Typograf.rule({
    title: 'Дефис после кое и кой',
    name: 'dash:koe',
    sortIndex: 38,
    func: function(text) {
        var re = new RegExp(before + '(К|к)ое\\s([а-я]{3,})' + after, 'g');
        text = text.replace(re, '$1$2ое-$3$4');
        
        var re2 = new RegExp(before + '(К|к)ой\\s([а-я]{3,})' + after, 'g');
        return text.replace(re2, '$1$2ой-$3$4');
    }
});

Typograf.rule({
    title: 'Дефис между верно-таки и т.д.',
    name: 'dash:taki',
    sortIndex: 39,
    func: function(text) {
        var re = new RegExp('(верно|довольно|опять|прямо|так|всё|действительно|неужели)\\s(таки)' + after, 'g');
        return text.replace(re, '$1-$2$3');
    }
});

})();

Typograf.rule({
    title: 'Дефис между месяцами',
    name: 'dash:month',
    sortIndex: 610,
    func: function(text) {
        var part = '(январь|февраль|март|апрель|июнь|июль|август|сентябрь|октябрь|ноябрь|декабрь)',
            re = new RegExp(part + ' ?(-|—) ?' + part, 'gi');

        return text.replace(re, '$1' + this.setting('dashInterval') + '$3');
    }
});

Typograf.rule({
    title: 'Дефис между днями недели',
    name: 'dash:weekday',
    sortIndex: 600,
    func: function(text) {
        var dash = this.setting('dashInterval'),
            part = '(понедельник|вторник|среда|четверг|пятница|суббота|воскресенье)',
            re = new RegExp(part + ' ?(-|—) ?' + part, 'gi');

        return text.replace(re, '$1—$3')
            .replace(/(^|\n|>) ?(-|—) /g, '$1— ')
            .replace(/(^|[^\d\-])(\d{1,4}) ?(-|—) ?(\d{1,4})([^\d\-\=]|$)/g, '$1$2' + dash + '$4$5');
    }
});

Typograf.rule({
    title: 'Неразрывный пробел после № и §',
    name: 'nbsp:after_num',
    sortIndex: 610,
    func: function(text) {
        return text.replace(/№(\d)/g, '№\u00A0$1').replace(/§(\d|I|V|X)/g, '§\u00A0$1');
    }
});

Typograf.rule({
    title: 'Неразрывный пробел перед ли, ль, же, бы, б',
    name: 'nbsp:before_particle',
    sortIndex: 570,
    func: function(text) {
        return text.replace(/ (ли|ль|же|ж|бы|б)([^а-яА-Я])/g, '\u00A0$1$2');
    }
});

Typograf.rule({
    title: 'Неразрывный пробел перед последним коротким словом в предложении',
    name: 'nbsp:before_last_word', 
    sortIndex: 620,
    func: function(text) {
        var len = this.setting('lengthLastWord'),
            re = new RegExp('( )([а-яА-Я\\w]{1,' + len + '})(\\.|\\?|:|\\!|,)', 'g');

        return len > 0 ? text.replace(re, '\u00A0$2$3') : text;
    }
});

Typograf.defaultSetting('lengthLastWord', 3);

Typograf.rule({
    title: 'Расстановка запятых и неразрывного пробела перед а и но',
    name: 'nbsp:but',
    sortIndex: 1110,
    func: function(text) {
        var re = new RegExp('([,])?( |\u00A0|\n)(а|но)( |\u00A0|\n)', 'g');
        return text.replace(re, ',$2$3$4');
    }
});

Typograf.rule({
    title: 'm2 → м², m3 → м³ и неразрывный пробел',
    name: 'nbsp:m',
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
    name: 'nbsp:ooo',
    sortIndex: 1100,
    func: function(text) {
        return text.replace(/(ООО|ОАО) /g, '$1\u00A0');
    }
});

Typograf.rule({
    title: 'Неразрывный пробел после XXXX',
    name: 'nbsp:xxxx',
    sortIndex: 1060,
    func: function(text) {
        return text.replace(/(^|\D)(\d{4}) ?г( |,|;|\.|\n|$)/g, '$1$2\u00A0г$3');
    }
});

Typograf.rule({
    title: 'г.г. → гг. и неразрывный пробел',
    name: 'nbsp:yy',
    sortIndex: 1080,
    func: function(text) {
        return text.replace(/(^| )г\. ?г\./g, '\u00A0гг.');
    }
});

Typograf.rule({
    title: 'Пробел после знаков пунктуации', 
    name: 'space:after_punctuation', 
    sortIndex: 560, 
    func: function(text) {
        return text
            .replace(/(\!|;|\?)([^ \n\t\!;\?])/g, '$1 $2')
            .replace(/(\D)(,|\:)([^ \/\d\n\t\!;,\?\.\:])/g, '$1$2 $3');
    }
});

Typograf.rule({
    name: '-space:before',
    sortIndex: 500,
    func: function(text) {
        return text.replace(/\r/g, '');
    }
});

Typograf.rule({
    title: 'Удаление пробела перед %',
    name: 'space:del_before_percent',
    sortIndex: 600,
    func: function(text) {
        return text.replace(/\d( |\u0A00)%/g, '%');
    }
});

Typograf.rule({
    title: 'Удаление пробелов перед знаками пунктуации',
    name: 'space:del_before_punctuation',
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
    title: 'Удаление повторяющихся пробелов',
    name: 'space:del_repeat_space',
    sortIndex: 540,
    func: function(text) {
        return text.replace(/ {2,}/g, ' ').replace(/\n {1,}/g, '\n').replace(/\n{3,}/g, '\n\n');
    }
});

Typograf.rule({
    title: 'Замена табов на пробелы',
    name: 'space:replace_tab',
    sortIndex: 510,
    func: function(text) {
        return text.replace(/\t/g, ' ');
    }
});

Typograf.rule({
    title: 'Удаление пробелов в начале и в конце текста',
    name: 'space:trim',
    sortIndex: 530,
    func: function(text) {
        return text.trim();
    }
});

Typograf._sortRules();
Typograf._needSortRules = true;
