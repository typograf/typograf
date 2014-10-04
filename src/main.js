/*! Typograf | (c) 2014 Denis Seleznev | https://github.com/hcodes/typograf/ */

function Typograf(mode) {
    this._mode = (mode < 0 || mode > 2) ? 0 : mode;

    this._settings = {};
    for(var i in this._defaultSettings) {
        if(this._defaultSettings.hasOwnProperty(i)) {
            this._settings[i] = this._defaultSettings[i];
        }
    }

    this._enabledRules = {};
    for(i = 0; i < this._rules.length; i++) {
        var rule = this._rules[i];
        this._enabledRules[rule.name] = rule.enabled;
    }
}

Typograf.rule = function(name, priority, callback, enabled) {
    Typograf.prototype._rules.push({
        name: name,
        priority: priority,
        callback: callback,
        enabled: enabled === false ? false : true
    });

    if(Typograf._needSortRules) {
        this._sortRules();
    }
};

Typograf.setting = function(name, defaultValue) {
    Typograf.prototype._defaultSettings[name] = defaultValue;
};

Typograf._sortRules = function() {
    Typograf.prototype._rules.sort(function(a, b) {
        return a.priority > b.priority ? 1 : -1;
    });
};

Typograf.prototype = {
    version: '0.2',
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
        this._enabledRules[rule] = true;
    },
    disable: function(rule) {
        this._enabledRules[rule] = false;
    },
    execute: function(text) {
        if(!text) {
            return '';
        }

        text = this._utfication(text);

        if(typeof this.onBefore === 'function') {
            text = this.onBefore(text);
        }

        for(var i = 0; i < this._rules.length; i++) {
            var rule = this._rules[i];
            if(this.enabled(rule.name)) {
                text = rule.callback.call(this, text);
            }
        }

        if(typeof this.onAfter === 'function') {
            text = this.onAfter(text);
        }

        text = this._modification(text);

        return text;
    },
    _defaultSettings: {},
    _rules: [],
    _utfication: function(text) {
        var e = this.entities;
        for(var i = 0, len = e.length; i < len; i++) {
            var item = e[i],
                re = new RegExp('(' + item[0] + '|' + item[1] + ')', 'g');

            text = text.replace(re, item[2]);
        }

        return text;
    },
    _modification: function(text) {
        if(!this.mode) {
            return text;
        }

        var index = this.mode === 2 ? 1 : 0,
            re,
            e = this.entities;

        for(var i = 0, len = e.length; i < len; i++) {
            re = new RegExp(e[i][2], 'g');
            text = text.replace(re, e[i][index]);
        }
        
        return text;
    }
};
