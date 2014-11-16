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

        this._isHTML = text.search(/<[a-z]/) !== -1;

        if(this._isHTML) {
            text = this._hideSafeTags(text);
        }

        text = this._utfication(text);

        this._rules.forEach(function(rule) {
            var ruleLang = rule._lang.replace(/^_/, '');

            if(this.enabled(rule.name) && (ruleLang === 'common' || ruleLang === lang)) {
                text = rule.func.call(this, text, this._settings[rule.name]);
            }
        }, this);

        text = this._modification(text);

        if(this._isHTML) {
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
     * @param {string|Array[string]} rule Название правила
     * @return {boolean}
     */
    disable: function(rule) {
        return this._enable(rule, false);
    },
    data: {},
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
                .replace(/\*/, '.*'));
            
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
