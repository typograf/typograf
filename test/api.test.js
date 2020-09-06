import Typograf from '../build/typograf';

const t = new Typograf({locale: 'en-US'});

describe('API', function() {
    it('should disable rule', function() {
        t.disableRule('common/punctuation/quote');
        expect(t.isDisabledRule('common/punctuation/quote')).toBeTruthy();

        t.enableRule('common/punctuation/quote');
    });

    it('should disable rule from constructor', function() {
        const typograf = new Typograf({locale: 'ru', disableRule: '*'});
        expect(typograf.isDisabledRule('common/punctuation/quote')).toBeTruthy();
    });

    it('should set/get data', function() {
        Typograf.setData('prop', 10);
        expect(Typograf.getData('prop')).toEqual(10);

        Typograf.setData('prop', 20);
        expect(Typograf.getData('prop')).toEqual(20);
    });

    it('should set data as object', function() {
        Typograf.setData({
            'prop1': 1,
            'prop2': 2
        });

        expect(Typograf.getData('prop1')).toEqual(1);
        expect(Typograf.getData('prop2')).toEqual(2);
    });

    it('should enable rule', function() {
        expect(t.isDisabledRule('common/html/pbr')).toBeTruthy();

        t.enableRule('common/html/pbr');
        expect(t.isEnabledRule('common/html/pbr')).toBeTruthy();

        t.disableRule('common/html/pbr');
    });

    it('should enable rule from constructor', function() {
        const typograf = new Typograf({locale: 'ru', enableRule: '*'});
        expect(typograf.isEnabledRule('common/html/p')).toBeTruthy();
    });

    it('should enable some rules', function() {
        t.enableRule(['common/html/pbr', 'common/html/url']);
        expect(t.isEnabledRule('common/html/pbr')).toBeTruthy();
        expect(t.isEnabledRule('common/html/url')).toBeTruthy();

        t.disableRule(['common/html/pbr', 'common/html/url']);

        t.enableRule('ru/optalign/*');
        expect(t.isEnabledRule('ru/optalign/quote')).toBeTruthy();
        expect(t.isEnabledRule('ru/optalign/bracket')).toBeTruthy();
        expect(t.isEnabledRule('ru/optalign/comma')).toBeTruthy();

        t.disableRule('ru/optalign/*');
        expect(t.isDisabledRule('ru/optalign/quote')).toBeTruthy();
        expect(t.isDisabledRule('ru/optalign/bracket')).toBeTruthy();
        expect(t.isDisabledRule('ru/optalign/comma')).toBeTruthy();
    });

    it('should get/set a setting', function() {
        t.setSetting('fake', 'value', 10);

        expect(t.getSetting('fake', 'value')).toEqual(10);

        expect(t.getSetting('common/nbsp/beforeShortLastWord', 'lengthLastWord')).toEqual(3);

        expect(t.getSetting('fake')).toBeUndefined();
    });

    it('should add safe tag', function() {
        const t2 = new Typograf({locale: 'en-US'});
        t2.addSafeTag('<myTag>', '</myTag>');

        expect(t2.execute('  <myTag>  Hello world!!  </myTag>  ')).toEqual('<myTag>  Hello world!!  </myTag>');
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

        expect(t2.execute('rule abc inner_example')).toEqual('abc');
    });

    it('should throw error without locale', function() {
        expect(function() {
            const t = new Typograf();
            const result = t.execute('text');
        }).toThrow(/Not defined/);
    });

    it('should throw error with unknown locale', function() {
        expect(function() {
            const t = new Typograf();
            const result = t.execute('text', {locale: 'unknow'});
        }).toThrow(/not supported/);
    });

    it('should remove CR', function() {
        expect(t.execute('Line1\nLine2\nLine3')).toEqual('Line1\nLine2\nLine3');
        expect(t.execute('Line1\r\nLine2\r\nLine3')).toEqual('Line1\nLine2\nLine3');
        expect(t.execute('Line1\rLine2\r\nLine3')).toEqual('Line1\nLine2\nLine3');
        expect(t.execute('Line1\rLine2\rLine3')).toEqual('Line1\nLine2\nLine3');
    });

    it('should change line endings', function() {
        const t = new Typograf({locale: 'en-US', lineEnding: 'CRLF'});

        expect(t.execute('Line1\rLine2\rLine3')).toEqual('Line1\r\nLine2\r\nLine3');

        expect(t.execute('Line1\nLine2\nLine3', { lineEnding: 'CR' })).toEqual('Line1\rLine2\rLine3');
        expect(t.execute('Line1\rLine2\rLine3', { lineEnding: 'LF' })).toEqual('Line1\nLine2\nLine3');
        expect(t.execute('Line1\rLine2\nLine3', { lineEnding: 'CRLF' })).toEqual('Line1\r\nLine2\r\nLine3');
    });

    it('should remove unnecessary nbsp for live mode', function() {
        const t = new Typograf({locale: 'en-US', live: true});
        expect(t.execute('Test&nbsp;test&nbsp;test.')).toEqual('Test test test.');
    });

    it('should execute specific methods before and after a rule', function() {
        const t = new Typograf({locale: 'en-US'});
        t._onBeforeRule = jest.fn();
        t._onAfterRule = jest.fn();
        t.execute('test');

        expect(t._onBeforeRule).toHaveBeenCalled();
        expect(t._onAfterRule).toHaveBeenCalled();
    })

    it('should correct version', function() {
        expect(Typograf.version.search(/^\d/) > -1).toBeTruthy();
    });

    it('should process separate parts', function() {
        const t = new Typograf({locale: 'ru'});
        const result = t.execute('"Я <p> "Я" </p> Я"');

        expect('«Я <p> «Я» </p> Я»').toEqual(result);
    });

    it('should process not separate parts', function() {
        const t = new Typograf({locale: 'ru', processingSeparateParts: false});
        const result = t.execute('"Я <p> "Я" </p> Я"');

        expect('«Я <p> „Я“ </p> Я»').toEqual(result);
    });
});
