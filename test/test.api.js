var assert = require('chai').assert,
    rules = require('./rules.js'),
    Typograf = require('../dist/typograf.js'),
    t = new Typograf();

describe('API', function() {
    it('disable rule', function() {
        t.disable('quot');
        assert.ok(t.disabled('quot'));

        t.enable('quot');
    });

    it('enable rule', function() {
        assert.ok(t.disabled('html/pbr'));

        t.enable('html/pbr');
        assert.ok(t.enabled('html/pbr'));

        t.disable('html/pbr');
    });

    it('enable some rules', function() {
        t.enable(['html/pbr', 'html/url']);
        assert.ok(t.enabled('html/pbr'));
        assert.ok(t.enabled('html/url'));

        t.disable(['html/pbr', 'html/url']);
    });

    it('get/set setting', function() {
        t.setting('fake', 'value', 10);

        assert.equal(t.setting('fake', 'value'), 10);

        assert.equal(t.setting('nbsp/beforeShortLastWord', 'lengthLastWord'), 3);

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
            name: 'example',
            sortIndex: 100,
            func: function(text) {
                return 'example';
            }
        });

        var t2 = new Typograf();

        assert.equal(t2.execute('hello'), 'example');
    });
});
