/*! Typograf | © 2014 Denis Seleznev | https://github.com/hcodes/typograf/ */

/**
 * @constructor
 */
function Typograf(prefs) {
    this._prefs = typeof prefs === 'object' ? prefs : {};

    this._settings = {};
    this._enabledRules = {};

    this._initSafeTags();
    this._rules.forEach(this._prepareRule, this);
}

/**
 * Добавить правило.
 *
 * @static
 * @param {Object} rule
 * @param {string} rule.name Название правила
 * @param {string} rule.title Описание правила
 * @param {string} rule.sortIndex Индекс сортировки, чем больше число, тем позже выполняется
 * @param {Function} rule.func Функция обработки
 * @param {boolean} [rule.enabled] Включено ли правило по умолчанию
 * @return {Typograf} this
 */
Typograf.rule = function(rule) {
    rule.enabled = rule.enabled === false ? false : true;
    rule._lang = rule.name.split('/')[0];
    rule.sortIndex = rule.sortIndex || 0;

    Typograf.prototype._rules.push(rule);

    if(Typograf._needSortRules) {
        this._sortRules();
    }

    return this;
};

/**
 * Добавить внутреннее правило.
 * Внутренние правила выполняются до основных.
 * @static
 * @param {Object} rule
 * @param {string} rule.name Название правила
 * @param {string} [rule.title] Описание правила
 * @param {string} [rule.sortIndex] Индекс сортировки, чем больше число, тем позже выполняется
 * @param {Function} rule.func Функция обработки
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

Typograf._sortInnerRules = function() {
    Typograf.prototype._innerRules.sort(function(a, b) {
        return a.sortIndex > b.sortIndex ? 1 : -1;
    });
};

Typograf.prototype = {
    constructor: Typograf,
    /**
    * Типографировать текст.
    *
    * @param {string} text
    * @param {Object} [params]
    * @return {string}
    */
    execute: function(text, params) {
        params = params || {};

        var that = this,
            lang = params.lang || this._prefs.lang || 'common',
            rulesForQueue = {},
            innerRulesForQueue = {},
            mode = typeof params.mode === 'undefined' ? this._prefs.mode : params.mode,
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
     * @param {string|Array[string]} rule Название правила
     * @return {boolean}
     */
    disable: function(rule) {
        return this._enable(rule, false);
    },
    /**
     * Добавить безопасный тег.
     *
     * @param {string} startTag
     * @param {string} endTag
     */
    addSafeTag: function(startTag, endTag) {
        this._safeTags.push([startTag, endTag]);
    },
    /**
     * Возращает строку с диапозоном символов для текущего языка,
     * используется в регул. выражениях в правилах
     *
     * @return {string}
     */    
    letters: function() {
        var lang = this._lang || this._prefs.lang,
            commonLetter = this.data['common/letter'],
            langLetter = this.data[lang + '/letter'];
        
        return commonLetter === langLetter || !lang ? commonLetter : commonLetter + langLetter;
    },
    data: {},
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
            ['<!\\[CDATA\\[', '\\]\\]>'],
            ['<code[^>]*?>', '</code>'],
            ['<object[^>]*?', '</object>'],
            ['<pre[^>]*?>', '</pre>'],
            ['<script[^>]*?>', '</script>'],
            ['<style[^>]*?>', '</style>']
        ];
    },
    _hideSafeTags: function(text) {
        this._hiddenSafeTags = {};

        var that = this,
            i = 0,
            pasteTag = function(match) {
                var key = '__typograf' + i + '__';
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

            if(text.search(/__typograf[\d]+__/) < 0) {
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

if(typeof exports === 'object') {
    module.exports = Typograf;
}
