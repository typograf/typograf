'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const rules = require('../build/specs');
const Typograf = require('../build/typograf');
const t = new Typograf({locale: 'en-US'});

describe('API', function() {
    it('should disable rule', function() {
        t.disableRule('common/punctuation/quote');
        assert.ok(t.isDisabledRule('common/punctuation/quote'));

        t.enableRule('common/punctuation/quote');
    });

    it('should disable rule from constructor', function() {
        const typograf = new Typograf({locale: 'ru', disableRule: '*'});
        assert.ok(typograf.isDisabledRule('common/punctuation/quote'));
    });

    it('should set/get data', function() {
        Typograf.setData('prop', 10);
        assert.equal(Typograf.getData('prop'), 10);

        Typograf.setData('prop', 20);
        assert.equal(Typograf.getData('prop'), 20);
    });

    it('should set data as object', function() {
        Typograf.setData({
            'prop1': 1,
            'prop2': 2
        });

        assert.equal(Typograf.getData('prop1'), 1);
        assert.equal(Typograf.getData('prop2'), 2);
    });

    it('should enable rule', function() {
        assert.ok(t.isDisabledRule('common/html/pbr'));

        t.enableRule('common/html/pbr');
        assert.ok(t.isEnabledRule('common/html/pbr'));

        t.disableRule('common/html/pbr');
    });

    it('should enable rule from constructor', function() {
        const typograf = new Typograf({locale: 'ru', enableRule: '*'});
        assert.ok(typograf.isEnabledRule('common/html/p'));
    });

    it('should enable some rules', function() {
        t.enableRule(['common/html/pbr', 'common/html/url']);
        assert.ok(t.isEnabledRule('common/html/pbr'));
        assert.ok(t.isEnabledRule('common/html/url'));

        t.disableRule(['common/html/pbr', 'common/html/url']);

        t.enableRule('ru/optalign/*');
        assert.ok(t.isEnabledRule('ru/optalign/quote'));
        assert.ok(t.isEnabledRule('ru/optalign/bracket'));
        assert.ok(t.isEnabledRule('ru/optalign/comma'));

        t.disableRule('ru/optalign/*');
        assert.ok(t.isDisabledRule('ru/optalign/quote'));
        assert.ok(t.isDisabledRule('ru/optalign/bracket'));
        assert.ok(t.isDisabledRule('ru/optalign/comma'));
    });

    it('should get/set a setting', function() {
        t.setSetting('fake', 'value', 10);

        assert.equal(t.getSetting('fake', 'value'), 10);

        assert.equal(t.getSetting('common/nbsp/beforeShortLastWord', 'lengthLastWord'), 3);

        assert.equal(t.getSetting('fake'), undefined);
    });

    it('should add safe tag', function() {
        const t2 = new Typograf({locale: 'en-US'});
        t2.addSafeTag('<myTag>', '</myTag>');

        assert.equal(t2.execute('  <myTag>  Hello world!!  </myTag>  '), '<myTag>  Hello world!!  </myTag>');
    });

    it('should add rule', function() {
        Typograf.addRule({
            name: 'common/example',
            index: 100,
            handler: function(text) {
                return text.replace(/rule/, '');
            }
        });

        Typograf.addInnerRule({
            name: 'common/example',
            handler: function(text) {
                return text.replace(/inner_example/, '');
            }
        });
        const t2 = new Typograf({locale: 'en-US'});

        assert.equal(t2.execute('rule abc inner_example'), 'abc');
    });

    it('should throw error without locale', function() {
        assert.throws(function() {
            const t = new Typograf();
            const result = t.execute('text');
        }, Error, /Not defined/);
    });

    it('should throw error with unknown locale', function() {
        assert.throws(function() {
            const t = new Typograf();
            const result = t.execute('text', {locale: 'unknow'});
        }, Error, /not supported/);
    });

    it('should remove CR', function() {
        assert.equal(t.execute('Line1\nLine2\nLine3'), 'Line1\nLine2\nLine3');
        assert.equal(t.execute('Line1\r\nLine2\r\nLine3'), 'Line1\nLine2\nLine3');
        assert.equal(t.execute('Line1\rLine2\r\nLine3'), 'Line1\nLine2\nLine3');
        assert.equal(t.execute('Line1\rLine2\rLine3'), 'Line1\nLine2\nLine3');
    });

    it('should change line endings', function() {
        const t = new Typograf({locale: 'en-US', lineEnding: 'CRLF'});

        assert.equal(t.execute('Line1\rLine2\rLine3'), 'Line1\r\nLine2\r\nLine3');

        assert.equal(t.execute('Line1\nLine2\nLine3', { lineEnding: 'CR' }), 'Line1\rLine2\rLine3');
        assert.equal(t.execute('Line1\rLine2\rLine3', { lineEnding: 'LF' }), 'Line1\nLine2\nLine3');
        assert.equal(t.execute('Line1\rLine2\nLine3', { lineEnding: 'CRLF' }), 'Line1\r\nLine2\r\nLine3');
    });

    it('should remove unnecessary nbsp for live mode', function() {
        const t = new Typograf({locale: 'en-US', live: true});
        assert.equal(t.execute('Test&nbsp;test&nbsp;test.'), 'Test test test.');
    });

    it('should execute specific methods before and after a rule', function() {
        const t = new Typograf({locale: 'en-US'});
        t._onBeforeRule = sinon.spy();
        t._onAfterRule = sinon.spy();
        t.execute('test');

        assert.isOk(t._onBeforeRule.called);
        assert.isOk(t._onAfterRule.called);
    })

    it('should correct version', function() {
        assert.isOk(Typograf.version.search(/^\d/) > -1);
    });

    it('should process separate parts', function() {
        const t = new Typograf({locale: 'ru'});
        const result = t.execute('"Я <p> "Я" </p> Я"');

        assert.equal('«Я <p> «Я» </p> Я»', result);
    });

    it('should process not separate parts', function() {
        const t = new Typograf({locale: 'ru', processingSeparateParts: false});
        const result = t.execute('"Я <p> "Я" </p> Я"');

        assert.equal('«Я <p> „Я“ </p> Я»', result);
    });
});
