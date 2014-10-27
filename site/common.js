(function() {

function $(cls) {
    return document.querySelector(cls);
}

function escapeHTML(text) {
    return  text.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
}

function hide(el) {
    $(el).style.display = 'none';
}

function show(el) {
    $(el).style.display = 'block';
}

function isVisible(el) {
    return !!$(el).offsetHeight;
}

function toggle(el) {
    if(isVisible(el)) {
        show(el);
    } else {
        hide(el);
    }
}

function getPrefix(str) {
    var prefix = str.split(':');
    if(prefix.length === 1) {
        prefix = '';
    } else {
        prefix = prefix[0];
    }

    return prefix;
}

function getHashParams(param) {
    var hash = window.location.hash.replace(/^#!/, ''),
        buf = hash.split('&'),
        params = {};

    for(var i = 0; i < buf.length; i++) {
        var el = buf[i].split('=');
        if(el.length > 1 && el[1] !== undefined) {
            try {
                params[el[0]] = window.decodeURIComponent(el[1]);
            } catch(e) {
                params[el[0]] = el[1];
            }
        }
    }

    return params;
}

function getHashParam(param) {
    return getHashParams()[param];
}

function addEvent(elem, type, callback) {
    var elem = typeof elem === 'string' ? $(elem) : elem;
    if(Array.isArray(type)) {
        type.forEach(function(el) {
            elem.addEventListener(el, callback, false);
        });
    } else {
        elem.addEventListener(type, callback, false);
    }
}

var typo = new Typograf();

var App = {
    init: function() {
        this._setValue(getHashParam('text') || '');

        this._events();

        this.prefs._events();

        this.execute();
    },
    execute: function() {
        var res = typo.execute(this._getValue());
        $('#result-html').innerHTML = res.replace(/(\u00A0|&nbsp;|&#160;)/g, '<span class="nbsp">\u00A0;</span>');
        $('#result').innerHTML = res;
    },
    prefs: {
        show: function() {
            this._build();
            show('#prefs');
            hide('#edit');
        },
        hide: function() {
            hide('#prefs');
            show('#edit');
        },
        toggle: function() {
            if(isVisible('#prefs')) {
                this.hide();
            } else {
                this.show();
            }
        },
        save: function() {
            var els = $('#prefs__items').querySelectorAll('input');
            for (var i = 0; i < els.length; i++) {
                var id = els[i].dataset['id'],
                    ch = els[i].checked;

                this._prefs[id] = ch;

                if(ch) {
                    typo.enable(id);
                } else {
                    typo.disable(id);
                }
            }

            this.hide();
        },
        cancel: function() {
            this.hide();
        },
        _prefs: {},
        _build: function() {
            var rules = Typograf.prototype._rules,
                html = '';

            var buf = [];
            rules.forEach(function(el) {
                buf.push(el);
            });

            buf.sort(function(a, b) {
                if(!a.name || !b.name) {
                    return -1;
                }

                var prefixA = getPrefix(a.name),
                    prefixB = getPrefix(b.name);

                if(prefixA > prefixB) {
                    return 1;
                } else if (prefixA === prefixB) {
                    return 0;
                } else {
                    return -1;
                }
            });

            var oldPrefix = '';
            buf.forEach(function(rule) {
                var name = rule.name;
                if (name.search('-') === 0) {
                    return;
                }

                var pr = getPrefix(name);
                if(pr !== oldPrefix) {
                    oldPrefix = pr;
                    html += '<div class="prefs__clear"></div>';
                }

                var title = escapeHTML(rule.title),
                    id = 'setting-' + name,
                    ch = typeof this._prefs[name] === 'undefined' ? rule.enabled : this._prefs[name],
                    checked = ch ? ' checked="checked"' : '';

                html += '<div class="prefs__item"><input type="checkbox"' + checked + ' id="' + id + '" data-id="' + name + '" /> <label for="' + id + '">' + title + '</label></div>';
            }, this);

            $('#prefs__items').innerHTML = html;
        },
        _events: function() {
            var that = this;
            addEvent('#prefs-save', 'click', function() {
                that.save();
            });

            addEvent('#prefs-cancel', 'click', function() {
                that.cancel();
            });

            addEvent('#prefs-all', 'click', function() {
                var els = $('#prefs__items').querySelectorAll('input');
                for (var i = 0; i < els.length; i++) {
                    els[i].checked = this.checked;
                }
            });
        }
    },
    _setValue: function(value) {
        $('#text').value = value;

        this._updateValue(value);
    },
    _getValue: function() {
        return $('#text').value;
    },
    _updateValue: function(value) {
        window.location.hash = '#!text=' + window.encodeURIComponent(value);
        
        this._updateClearText(value);
    },
    _updateClearText: function(value) {
        if(value.length > 0) {
            show('#clear-text');
        } else {
            hide('#clear-text');
        }
    },
    _events: function() {
        var that = this;

        addEvent('#set-prefs', 'click', function() {
            that.prefs.toggle();
        });

        addEvent('#view-textarea', 'click', function() {
            show('#result');
            hide('#result-html');
        });

        addEvent('#view-html', 'click', function() {
            show('#result-html');
            hide('#result');
        });

        addEvent('#clear-text', 'click', function() {
            that._setValue('');

            $('#text').focus();

            that.execute();
        });

        var oldValue = null;
        addEvent('#text', ['keyup', 'input', 'click'], function() {
            var val = that._getValue();
            if(val === oldValue) {
                return;
            }

            oldValue = val;

            that._updateValue(val);

            that.execute();
        });
    }
};

addEvent(window, 'load', function() {
    App.init();
});

})();
