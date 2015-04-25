var assert = require('chai').assert,
    rules = require('./rules'),
    Typograf = require('../dist/typograf'),
    t = new Typograf();

describe('API', function() {
    it('should disable rule', function() {
        t.disable('ru/quot');
        assert.ok(t.disabled('ru/quot'));

        t.enable('ru/quot');
    });

    it('should enable rule', function() {
        assert.ok(t.disabled('common/html/pbr'));

        t.enable('common/html/pbr');
        assert.ok(t.enabled('common/html/pbr'));

        t.disable('common/html/pbr');
    });

    it('should enable some rules', function() {
        t.enable(['common/html/pbr', 'common/html/url']);
        assert.ok(t.enabled('common/html/pbr'));
        assert.ok(t.enabled('common/html/url'));

        t.disable(['common/html/pbr', 'common/html/url']);

        t.enable('ru/optalign/*');
        assert.ok(t.enabled('ru/optalign/quot'));
        assert.ok(t.enabled('ru/optalign/bracket'));
        assert.ok(t.enabled('ru/optalign/comma'));

        t.disable('ru/optalign/*');
        assert.ok(t.disabled('ru/optalign/quot'));
        assert.ok(t.disabled('ru/optalign/bracket'));
        assert.ok(t.disabled('ru/optalign/comma'));
    });

    it('should get/set a setting', function() {
        t.setting('fake', 'value', 10);

        assert.equal(t.setting('fake', 'value'), 10);

        assert.equal(t.setting('common/nbsp/beforeShortLastWord', 'lengthLastWord'), 3);

        assert.equal(t.setting('fake'), undefined);
    });

    it('should get entities as name or digit', function() {
        var t2 = new Typograf({mode: 'name'});
        assert.equal(t2.execute('1\u00A02'), '1&nbsp;2');
        assert.equal(t2.execute('1&#160;2'), '1&nbsp;2');

        var t3 = new Typograf({mode: 'digit'});
        assert.equal(t3.execute('1\u00A02'), '1&#160;2');
        assert.equal(t3.execute('1&nbsp;2'), '1&#160;2');
    });
    
    it('should get entities as name or digit with method "execute"', function() {
        var t2 = new Typograf();
        assert.equal(t2.execute('1\u00A02\u00A03', {mode: 'name'}), '1&nbsp;2&nbsp;3');
        assert.equal(t2.execute('1&#160;2&#160;3', {mode: 'name'}), '1&nbsp;2&nbsp;3');
        assert.equal(t2.execute('1&#xA0;2&#160;3', {mode: 'name'}), '1&nbsp;2&nbsp;3');
        assert.equal(t2.execute('1&#xa0;2&#160;3', {mode: 'name'}), '1&nbsp;2&nbsp;3');
        assert.equal(t2.execute('1&#xa0;2&#xa0;3', {mode: 'name'}), '1&nbsp;2&nbsp;3');

        var t3 = new Typograf();
        assert.equal(t3.execute('1\u00A02\u00A03', {mode: 'digit'}), '1&#160;2&#160;3');
        assert.equal(t3.execute('1&nbsp;2&nbsp;3', {mode: 'digit'}), '1&#160;2&#160;3');
        assert.equal(t3.execute('1&#xa0;2&nbsp;3', {mode: 'digit'}), '1&#160;2&#160;3');
        assert.equal(t3.execute('1&#xa0;2&#160;3', {mode: 'digit'}), '1&#160;2&#160;3');
        assert.equal(t3.execute('1&#xa0;2&#xa0;3', {mode: 'digit'}), '1&#160;2&#160;3');
        assert.equal(t3.execute('1&#XA0;2&#XA0;3', {mode: 'digit'}), '1&#160;2&#160;3');
    });

    it('should add safe tag', function() {
        var t2 = new Typograf();
        t2.addSafeTag('<myTag>', '<\\/myTag>');

        assert.equal(t2.execute('  <myTag>  Hello world!!  </myTag>  '), '<myTag>  Hello world!!  </myTag>');
    });

    it('should add rule', function() {
        Typograf.rule({
            name: 'common/example',
            sortIndex: 100,
            func: function(text) {
                return text.replace(/rule/, '');
            }
        });
        
        Typograf.innerRule({
            name: 'common/example',
            func: function(text) {
                return text.replace(/inner_example/, '');
            }
        });
        var t2 = new Typograf();

        assert.equal(t2.execute('rule abc inner_example'), 'abc');
    });
});
