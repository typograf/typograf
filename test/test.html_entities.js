'use strict';

const assert = require('chai').assert;
const rules = require('../build/specs');
const Typograf = require('../build/typograf');

describe('HTML Entities', function() {
    it('should get entities as name or digit', function() {
        const tName = new Typograf({locale: 'en-US', htmlEntity: {type: 'name'}});
        assert.equal(tName.execute('1\u00A02'), '1&nbsp;2');
        assert.equal(tName.execute('1&#160;2'), '1&nbsp;2');

        const tDigit = new Typograf({locale: 'en-US', htmlEntity: {type: 'digit'}});
        assert.equal(tDigit.execute('1\u00A02'), '1&#160;2');
        assert.equal(tDigit.execute('1&nbsp;2'), '1&#160;2');
    });

    it('should get entities as name or digit with method "execute"', function() {
        const tName = new Typograf();
        const nameParams = {locale: 'en-US', htmlEntity: {type: 'name'}};
        assert.equal(tName.execute('1\u00A02\u00A03', nameParams), '1&nbsp;2&nbsp;3');
        assert.equal(tName.execute('1&#160;2&#160;3', nameParams), '1&nbsp;2&nbsp;3');
        assert.equal(tName.execute('1&#xA0;2&#160;3', nameParams), '1&nbsp;2&nbsp;3');
        assert.equal(tName.execute('1&#xa0;2&#160;3', nameParams), '1&nbsp;2&nbsp;3');
        assert.equal(tName.execute('1&#xa0;2&#xa0;3', nameParams), '1&nbsp;2&nbsp;3');

        const tDigit = new Typograf();
        const digitParams = {locale: 'en-US', htmlEntity: {type: 'digit'}};
        assert.equal(tDigit.execute('1\u00A02\u00A03', digitParams), '1&#160;2&#160;3');
        assert.equal(tDigit.execute('1&nbsp;2&nbsp;3', digitParams), '1&#160;2&#160;3');
        assert.equal(tDigit.execute('1&#xa0;2&nbsp;3', digitParams), '1&#160;2&#160;3');
        assert.equal(tDigit.execute('1&#xa0;2&#160;3', digitParams), '1&#160;2&#160;3');
        assert.equal(tDigit.execute('1&#xa0;2&#xa0;3', digitParams), '1&#160;2&#160;3');
        assert.equal(tDigit.execute('1&#XA0;2&#XA0;3', digitParams), '1&#160;2&#160;3');
    });

    it('should get entities as name only for invisible symbols', function() {
        const t = new Typograf({locale: 'en-US', htmlEntity: {type: 'name', onlyInvisible: true}});
        assert.equal(t.execute('1\u00A02… a\u00A0b…'), '1&nbsp;2… a&nbsp;b…');
    });

    it('should get entities as digit only for invisible symbols', function() {
        const t = new Typograf({locale: 'en-US', htmlEntity: {type: 'digit', onlyInvisible: true}});
        assert.equal(t.execute('1\u00A02… a\u00A0b…'), '1&#160;2… a&#160;b…');
    });

    it('should get entities as digit only for own list', function() {
        const t = new Typograf({locale: 'en-US', htmlEntity: {type: 'digit', list: ['hellip']}});
        assert.equal(t.execute('1\u00A02… a\u00A0b…'), '1\u00A02&#8230; a\u00A0b&#8230;');
    });
});
