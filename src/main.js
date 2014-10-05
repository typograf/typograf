/*! Typograf | (c) 2014 Denis Seleznev | https://github.com/hcodes/typograf/ */

function Typograf(mode) {
    this._mode = (mode < 0 || mode > 2) ? 0 : mode;

    this._settings = {};
    Object.keys(this._defaultSettings).forEach(function(prop) {
        this._settings[prop] = this._defaultSettings[prop];
    }, this);

    this._enabledRules = {};
    this._rules.forEach(function(rule) {
        this._enabledRules[rule.name] = rule.enabled;
    }, this);
}

Typograf.rule = function(name, sortIndex, callback, enabled) {
    Typograf.prototype._rules.push({
        name: name,
        sortIndex: sortIndex,
        callback: callback,
        enabled: enabled !== false
    });

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

        text = this._utfication(text);

        this._rules.forEach(function(rule) {
            if(this.enabled(rule.name)) {
                text = rule.callback.call(this, text);
            }
        }, this);

        text = this._modification(text);

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
    _utfication: function(text) {
        this.entities.forEach(function(entity) {
            var re = new RegExp('(' + entity[0] + '|' + entity[1] + ')', 'g');
            text = text.replace(re, entity[2]);
        }, this);

        return text;
    },
    _modification: function(text) {
        if(!this._mode) {
            return text;
        }

        var index = this._mode === 2 ? 1 : 0;
        this.entities.forEach(function(entity) {
            var re = new RegExp(entity[2], 'g');
            text = text.replace(re, entity[index]);
        }, this);

        return text;
    }
};
