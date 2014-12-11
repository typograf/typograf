(function() {

// for iPad 1
if(!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if(typeof this !== 'function') {
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function() {
            },
            fBound = function() {
                return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

function $(cls) {
    return document.querySelector(cls);
}

var div = document.createElement('div'),
    hasClassList = !!div.classList,
    addClass = hasClassList ? function(el, name) {
        el.classList.add(name);
    } : function(el, name) { // support IE9
        var re = new RegExp('(^|\\s)' + name + '(\\s|$)', 'g');
        if(!re.test(name.className)) {
            el.className = (el.className + ' ' + name)
                .replace(/\s+/g, ' ')
                .replace(/(^ | $)/g, '');
        }
    },
    removeClass = hasClassList ? function(el, name) {
        el.classList.remove(name);
    } : function(el, name) { // support IE9
        var re = new RegExp('(^|\\s)' + name + '(\\s|$)', 'g');
        el.className = el.className
            .replace(re, '$1')
            .replace(/\s+/g, ' ')
            .replace(/(^ | $)/g, '');
    },
    toggleClass = function(el, name) {
        if(hasClass(el, name)) {
            removeClass(el, name);
        } else {
            addClass(el, name);
        }
    },
    hasClass = hasClassList ? function(el, name) {
        return el.classList.contains(name);
    } : function(el, name) { // support IE9
        var re = new RegExp('(^|\\s)' + name + '(\\s|$)', 'g');
        return el.className.search(re) > -1;
    };

function escapeHTML(text) {
    return text.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
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
    var prefix = str.split('/');
    if(prefix.length === 2) {
        prefix = '';
    } else {
        prefix = prefix[1];
    }

    return prefix;
}

function getLangPrefix(str) {
    var prefix = str.split('/');

    return prefix[0];
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

function truncateString(text, len) {
    if(text) {
        return text.length > len ? text.substr(0, len) : text;
    }

    return '';
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

var typograf = new Typograf();

var App = {
    isMobile: false,
    init: function() {
        this.isMobile = document.body.className.search('page_is-mobile') > -1;

        if(!this.isMobile) {
            this._setValue(getHashParam('text') || '');
        }

        this.loadFromLocalStorage();

        this._updateLang();

        this._events();

        this.prefs._events();

        this.execute();
    },
    loadFromLocalStorage: function() {
        var rules;
        try {
            rules = JSON.parse(localStorage.getItem('settings.rules'));
            this.prefs.lang = localStorage.getItem('settings.lang');
        } catch(e) {}

        if(rules && typeof rules === 'object' && Array.isArray(rules.disabled) && Array.isArray(rules.enabled)) {
            typograf
                .enable(rules.enabled)
                .disable(rules.disabled);
        }

        this.prefs.lang = this.prefs.lang || 'ru';
    },
    execute: function() {
        var res = typograf.execute(this._getValue(), {lang: this.prefs.lang});

        if(this.isMobile) {
            $('.input__text').value = res;
        } else {
            $('.result__html').innerHTML = res.replace(/(\u00A0|&nbsp;|&#160;)/g, '<span class="nbsp">\u00A0</span>');
            $('.result__text').innerHTML = res;
        }
    },
    prefs: {
        show: function() {
            this._build();

            show('.prefs');
            hide('.input');

            $('.prefs__set-lang').value = this.lang;

            this._synchronizeMainCheckbox();
        },
        hide: function() {
            hide('.prefs');
            show('.input');
        },
        toggle: function() {
            if(isVisible('.prefs')) {
                this.hide();
            } else {
                this.show();
            }
        },
        saveToLocalStorage: function() {
            var enabled = [],
                disabled = [];

            Object.keys(typograf._enabledRules).forEach(function(name) {
                if(typograf._enabledRules[name]) {
                    enabled.push(name);
                } else {
                    disabled.push(name);
                }
            });

            try {
                localStorage.setItem('settings.rules', JSON.stringify({
                    enabled: enabled,
                    disabled: disabled
                }));

                localStorage.setItem('settings.lang', this.lang);
            } catch(e) {}
        },
        byDefault: function() {
            var els = this._getCheckboxes();
            for(var i = 0; i < els.length; i++) {
                var id = els[i].dataset['id'],
                    checked;
                Typograf.prototype._rules.some(function(rule) {
                    if(id === rule.name) {
                        var checked = !(rule.enabled === false);
                        els[i].checked = checked;

                        if(checked) {
                            typograf.enable(id);
                        } else {
                            typograf.disable(id);
                        }

                        return true;
                    }

                    return false;
                });
            }

            $('.prefs__all-rules').checked = false;

            this.saveToLocalStorage();
        },
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
                } else if(prefixA === prefixB) {
                    return 0;
                } else {
                    return -1;
                }
            });

            var oldPrefix = '';
            buf.forEach(function(rule) {
                var name = rule.name,
                    pr = getPrefix(name),
                    langPr = getLangPrefix(name);

                if(this.lang !== langPr && langPr !== 'common') {
                    return;
                }

                if(pr !== oldPrefix) {
                    oldPrefix = pr;
                    html += '<div class="prefs__clear"></div>';
                }

                var title = escapeHTML(rule.title),
                    id = 'setting-' + name,
                    ch = typograf.enabled(name),
                    checked = ch ? ' checked="checked"' : '';

                html += '<div class="prefs__rule"><input type="checkbox"' + checked + ' id="' + id + '" data-id="' + name + '" /> <label for="' + id + '">' + title + '</label></div>';
            }, this);

            $('.prefs__rules').innerHTML = html;
        },
        changeLang: function() {
            this.lang = $('.prefs__set-lang').value;
            this._build();
            this.saveToLocalStorage();

            App._updateLang();
        },
        _getCheckboxes: function() {
            return $('.prefs__rules').querySelectorAll('input');
        },
        _clickRule: function(e) {
            if(e.target && e.target.tagName && e.target.tagName.toLowerCase() !== 'input') {
                return;
            }

            var els = this._getCheckboxes();

            for(var i = 0; i < els.length; i++) {
                var el = els[i],
                    id = el.dataset['id'],
                    ch = el.checked;

                if(ch) {
                    typograf.enable(id);
                } else {
                    typograf.disable(id);
                }
            }

            this._synchronizeMainCheckbox();
            this.saveToLocalStorage();
        },
        _selectAll: function() {
            var checked = $('.prefs__all-rules').checked,
                els = this._getCheckboxes();

            for(var i = 0; i < els.length; i++) {
                var el = els[i],
                    id = el.dataset['id'];

                el.checked = checked;
                if(checked) {
                    typograf.enable(id);
                } else {
                    typograf.disable(id);
                }
            }

            this.saveToLocalStorage();
        },
        _synchronizeMainCheckbox: function() {
            var els = this._getCheckboxes(),
                count = 0;
            for(var i = 0; i < els.length; i++) {
                if(els[i].checked) {
                    count++;
                }
            }

            $('.prefs__all-rules').checked = count === els.length;
        },
        _events: function() {
            addEvent('.prefs__set-lang', 'change', this.changeLang.bind(this));

            addEvent('.prefs__rules', 'click', this._clickRule.bind(this));

            addEvent('.prefs__all-rules', 'click', this._selectAll.bind(this));

            addEvent('.prefs__default', 'click', this.byDefault.bind(this));
        }
    },
    _setValue: function(value) {
        $('.input__text').value = value;

        this._updateValue(value);
    },
    _getValue: function() {
        return $('.input__text').value;
    },
    _updateValue: function(value) {
        if(!this.isMobile) {
            window.location.hash = '#!text=' + window.encodeURIComponent(truncateString(value, 512));
        }

        this._updateClearText(value);
    },
    _updateClearText: function(value) {
        if(value.length > 0) {
            show('.input__clear');
        } else {
            hide('.input__clear');
        }
    },
    _updateLang: function() {
        var el = $('.current-lang');
        el.innerHTML = this.prefs.lang;
        el.value = this.prefs.lang;
    },
    _events: function() {
        addEvent('.set-prefs', 'click', (function() {
            var el = $('.set-prefs'),
                clSelected = 'set-prefs_selected';

            if(hasClass(el, clSelected)) {
                setTimeout(function() {
                    App.execute();
                }, 0);
            }
            toggleClass(el, clSelected);
            this.prefs.toggle();
        }).bind(this));

        if(!this.isMobile) {
            addEvent('.result__as-text', 'click', function() {
                show('.result__text');
                hide('.result__html');
            });

            addEvent('.result__as-html', 'click', function() {
                show('.result__html');
                hide('.result__text');
            });
        }

        addEvent('.input__clear', 'click', (function() {
            this._setValue('');

            $('.input__text').focus();

            this.execute();
        }).bind(this));

        var oldValue = null;

        if(this.isMobile) {
            addEvent('.input__execute', 'click', this.execute.bind(this));
        } else {
            addEvent('.input__text', ['keyup', 'input', 'click'], (function() {
                var val = this._getValue();
                if(val === oldValue) {
                    return;
                }

                oldValue = val;

                this._updateValue(val);

                this.execute();
            }).bind(this));
        }
    }
};

addEvent(window, 'load', App.init.bind(App));

})();
