var assert = require('chai').assert,
    rules = require('./rules.js'),
    Typograf = require('../dist/typograf.js'),
    t = new Typograf({lang: 'ru'});

describe('API', function() {
    it('disable rule', function() {
        t.disable('ru/quot');
        assert.ok(t.disabled('ru/quot'));

        t.enable('ru/quot');
    });

    it('enable rule', function() {
        assert.ok(t.disabled('common/html/pbr'));

        t.enable('common/html/pbr');
        assert.ok(t.enabled('common/html/pbr'));

        t.disable('common/html/pbr');
    });

    it('enable some rules', function() {
        t.enable(['common/html/pbr', 'common/html/url']);
        assert.ok(t.enabled('common/html/pbr'));
        assert.ok(t.enabled('common/html/url'));

        t.disable(['common/html/pbr', 'common/html/url']);
    });

    it('get/set setting', function() {
        t.setting('fake', 'value', 10);

        assert.equal(t.setting('fake', 'value'), 10);

        assert.equal(t.setting('common/nbsp/beforeShortLastWord', 'lengthLastWord'), 3);

        assert.equal(t.setting('fake'), undefined);
    });

    it('get entities as name or digit', function() {
        var t2 = new Typograf({mode: 'name'});
        assert.equal(t2.execute('1\u00A02'), '1&nbsp;2');
        assert.equal(t2.execute('1&#160;2'), '1&nbsp;2');

        var t3 = new Typograf({mode: 'digit'});
        assert.equal(t3.execute('1\u00A02'), '1&#160;2');
        assert.equal(t3.execute('1&nbsp;2'), '1&#160;2');
    });

    it('add rule', function() {
        Typograf.rule({
            name: 'common/example',
            sortIndex: 100,
            func: function(text) {
                return 'example';
            }
        });

        var t2 = new Typograf();

        assert.equal(t2.execute('hello'), 'example');
    });
});
