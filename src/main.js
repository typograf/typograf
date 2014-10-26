/*! Typograf | (c) 2014 Denis Seleznev | https://github.com/hcodes/typograf/ */

/**
* @constructor
*/

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
* Установить значение настройки по умолчанию.
*
* @statics
* @param {string|Array} name Название настройки или массив с настройками
* @param {*} [value] Значение настройки
* @return {Typograf} this
*/
Typograf.defaultSetting = function(name, value) {
    if(typeof name === 'object') {
        Object.keys(name).forEach(function(key) {
            Typograf.prototype._defaultSettings[key] = name[key];
        });
    } else {
        Typograf.prototype._defaultSettings[name] = value;
    }

    return this;
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
        if(!text) {
            return '';
        }

        var isHTML = text.search(/<|>/) !== -1;

        if(isHTML) {
            text = this._hideSafeTags(text);
        }

        text = this._utfication(text);

        this._rules.forEach(function(rule) {
            if(this.enabled(rule.name)) {
                text = rule.func.call(this, text);
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
    * @param {string} name
    * @return {string} [value]
    */
    setting: function(name, value) {
        if(arguments.length === 1) {
            return this._settings[name];
        } else {
            this._settings[name] = value;
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
    * Оключено ли правило.
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
    _defaultSettings: {},
    _rules: [],
    _hideSafeTags: function(text) {
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
    _showSafeTags: function(text) {
        Object.keys(this._hiddenTags).forEach(function(key) {
            text = text.replace(new RegExp(key, 'gim'), this._hiddenTags[key]);
        }, this);

        delete this._hiddenTags;

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
