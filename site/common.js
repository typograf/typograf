(function() {

function $(id) {
    return document.getElementById(id);
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
        this._events();
        this.prefs._events();
        
        this.execute();
    },
    execute: function() {
        var res = typo.execute($('text').value);
        $('result-html').innerHTML = res.replace(/(\u00A0|&nbsp;|&#160;)/g, '<span class="nbsp">\u00A0;</span>');
        $('result').innerHTML = res;
    },
    prefs: {
        show: function() {
            this._build();
            show('prefs');
            hide('edit');
        },
        hide: function() {
            hide('prefs');
            show('edit');
        },
        save: function() {
            var els = $('prefs__items').querySelectorAll('input');
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
            for(var i = 0; i < rules.length; i++) {
                var rule = rules[i],
                    name = rule.name,
                    title = rule.title,
                    id = 'setting-' + name,
                    ch = typeof this._prefs[name] === 'undefined' ? rule.enabled : this._prefs[name],
                    checked = ch ? ' checked="checked"' : '';

                if (name.search('-') === 0) {
                    continue;
                }

                html += '<div class="prefs__item"><input type="checkbox"' + checked + ' id="' + id + '" data-id="' + name + '" /> <label for="' + id + '">' + title + '</label></div>';
            }

            $('prefs__items').innerHTML = html;
        },
        _events: function() {
            var that = this;
            addEvent('prefs-save', 'click', function() {
                that.save();
            });

            addEvent('prefs-cancel', 'click', function() {
                that.cancel();
            });

            addEvent('prefs-all', 'click', function() {
                var els = $('prefs__items').querySelectorAll('input');
                for (var i = 0; i < els.length; i++) {
                    els[i].checked = this.checked;
                }
            });
        }
    },
    _events: function() {
        var that = this;

        addEvent('go', 'click', this.execute);

        addEvent('set-prefs', 'click', function() {
            that.prefs.show()
        });

        addEvent('view-textarea', 'click', function() {
            show('result');
            hide('result-html');
        });

        addEvent('view-html', 'click', function() {
            show('result-html');
            hide('result');
        });

        addEvent('clear', 'click', function() {
            $('text').value = '';
            $('text').focus();

            that.execute();
        });

        addEvent('text', ['keyup', 'paste', 'cut', 'blur', 'click'], function() {
            if ($('auto').checked) {
                that.execute();
            }
        });
    }
};

addEvent(window, 'load', function() {
    App.init();
});

})();
