'use strict';

const assert = require('chai').assert;
const rules = require('../build/rules');
const Typograf = require('../build/typograf');
const t = new Typograf();

describe('API', function() {
    it('should disable rule', function() {
        t.disable('ru/punctuation/quote');
        assert.ok(t.disabled('ru/punctuation/quote'));

        t.enable('ru/punctuation/quote');
    });

    it('should disable rule from constructor', function() {
        const typograf = new Typograf({lang: 'ru', disable: '*'});
        assert.ok(typograf.disabled('ru/punctuation/quote'));
    });

    it('should set/get data', function() {
        Typograf.data('prop', 10);
        assert.equal(Typograf.data('prop'), 10);

        Typograf.data('prop', 20);
        assert.equal(Typograf.data('prop'), 20);

        Typograf.data('prop', undefined);
    });

    it('should get data with lang', function() {
        const typograf = new Typograf({lang: 'ru'});
        assert.equal(typograf.data('ru/l'), Typograf.data('ru/l'));
    });
    
    it('should get data without lang', function() {
        const typograf = new Typograf({lang: 'ru'});
        assert.equal(typograf.data('l'), Typograf.data('ru/l'));
    });

    it('should set data as object', function() {
        Typograf.data({
            'prop1': 1,
            'prop2': 2
        });

        assert.equal(Typograf.data('prop1'), 1);
        assert.equal(Typograf.data('prop2'), 2);

        Typograf.data('prop1', undefined);
        Typograf.data('prop2', undefined);
    });

    it('should enable rule', function() {
        assert.ok(t.disabled('common/html/pbr'));

        t.enable('common/html/pbr');
        assert.ok(t.enabled('common/html/pbr'));

        t.disable('common/html/pbr');
    });

    it('should enable rule from constructor', function() {
        const typograf = new Typograf({lang: 'ru', enable: '*'});
        assert.ok(typograf.enabled('common/html/p'));
    });

    it('should enable some rules', function() {
        t.enable(['common/html/pbr', 'common/html/url']);
        assert.ok(t.enabled('common/html/pbr'));
        assert.ok(t.enabled('common/html/url'));

        t.disable(['common/html/pbr', 'common/html/url']);

        t.enable('ru/optalign/*');
        assert.ok(t.enabled('ru/optalign/quote'));
        assert.ok(t.enabled('ru/optalign/bracket'));
        assert.ok(t.enabled('ru/optalign/comma'));

        t.disable('ru/optalign/*');
        assert.ok(t.disabled('ru/optalign/quote'));
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
        const t2 = new Typograf({mode: 'name'});
        assert.equal(t2.execute('1\u00A02'), '1&nbsp;2');
        assert.equal(t2.execute('1&#160;2'), '1&nbsp;2');

        const t3 = new Typograf({mode: 'digit'});
        assert.equal(t3.execute('1\u00A02'), '1&#160;2');
        assert.equal(t3.execute('1&nbsp;2'), '1&#160;2');
    });

    it('should get entities as name or digit with method "execute"', function() {
        const t2 = new Typograf();
        assert.equal(t2.execute('1\u00A02\u00A03', {mode: 'name'}), '1&nbsp;2&nbsp;3');
        assert.equal(t2.execute('1&#160;2&#160;3', {mode: 'name'}), '1&nbsp;2&nbsp;3');
        assert.equal(t2.execute('1&#xA0;2&#160;3', {mode: 'name'}), '1&nbsp;2&nbsp;3');
        assert.equal(t2.execute('1&#xa0;2&#160;3', {mode: 'name'}), '1&nbsp;2&nbsp;3');
        assert.equal(t2.execute('1&#xa0;2&#xa0;3', {mode: 'name'}), '1&nbsp;2&nbsp;3');

        const t3 = new Typograf();
        assert.equal(t3.execute('1\u00A02\u00A03', {mode: 'digit'}), '1&#160;2&#160;3');
        assert.equal(t3.execute('1&nbsp;2&nbsp;3', {mode: 'digit'}), '1&#160;2&#160;3');
        assert.equal(t3.execute('1&#xa0;2&nbsp;3', {mode: 'digit'}), '1&#160;2&#160;3');
        assert.equal(t3.execute('1&#xa0;2&#160;3', {mode: 'digit'}), '1&#160;2&#160;3');
        assert.equal(t3.execute('1&#xa0;2&#xa0;3', {mode: 'digit'}), '1&#160;2&#160;3');
        assert.equal(t3.execute('1&#XA0;2&#XA0;3', {mode: 'digit'}), '1&#160;2&#160;3');
    });

    it('should add safe tag', function() {
        const t2 = new Typograf();
        t2.addSafeTag('<myTag>', '</myTag>');

        assert.equal(t2.execute('  <myTag>  Hello world!!  </myTag>  '), '<myTag>  Hello world!!  </myTag>');
    });

    it('should add rule', function() {
        Typograf.rule({
            name: 'common/example',
            index: 100,
            handler: function(text) {
                return text.replace(/rule/, '');
            }
        });

        Typograf.innerRule({
            name: 'common/example',
            handler: function(text) {
                return text.replace(/inner_example/, '');
            }
        });
        const t2 = new Typograf();

        assert.equal(t2.execute('rule abc inner_example'), 'abc');
    });
});
