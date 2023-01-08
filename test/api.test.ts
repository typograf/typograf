import Typograf from '../src/typograf';

const mainTypograf = new Typograf({ locale: 'en-US' });

describe('API', () => {
    it('should disable rule', () => {
        mainTypograf.disableRule('common/punctuation/quote');
        expect(mainTypograf.isDisabledRule('common/punctuation/quote')).toBeTruthy();

        mainTypograf.enableRule('common/punctuation/quote');
    });

    it('should disable rule from constructor', () => {
        const localTypograf = new Typograf({ locale: 'ru', disableRule: '*' });
        expect(localTypograf.isDisabledRule('common/punctuation/quote')).toBeTruthy();
    });

    it('should set data', () => {
        Typograf.setData({
            'prop1': 1,
            'prop2': 2
        });

        expect(Typograf.getData('prop1')).toEqual(1);
        expect(Typograf.getData('prop2')).toEqual(2);
    });

    it('should enable rule', () => {
        expect(mainTypograf.isDisabledRule('common/html/pbr')).toBeTruthy();

        mainTypograf.enableRule('common/html/pbr');
        expect(mainTypograf.isEnabledRule('common/html/pbr')).toBeTruthy();

        mainTypograf.disableRule('common/html/pbr');
    });

    it('should enable rule from constructor', () => {
        const localTypograf = new Typograf({ locale: 'ru', enableRule: '*' });
        expect(localTypograf.isEnabledRule('common/html/p')).toBeTruthy();
    });

    it('should enable some rules', () => {
        mainTypograf.enableRule(['common/html/pbr', 'common/html/url']);
        expect(mainTypograf.isEnabledRule('common/html/pbr')).toBeTruthy();
        expect(mainTypograf.isEnabledRule('common/html/url')).toBeTruthy();

        mainTypograf.disableRule(['common/html/pbr', 'common/html/url']);

        mainTypograf.enableRule('ru/optalign/*');
        expect(mainTypograf.isEnabledRule('ru/optalign/quote')).toBeTruthy();
        expect(mainTypograf.isEnabledRule('ru/optalign/bracket')).toBeTruthy();
        expect(mainTypograf.isEnabledRule('ru/optalign/comma')).toBeTruthy();

        mainTypograf.disableRule('ru/optalign/*');
        expect(mainTypograf.isDisabledRule('ru/optalign/quote')).toBeTruthy();
        expect(mainTypograf.isDisabledRule('ru/optalign/bracket')).toBeTruthy();
        expect(mainTypograf.isDisabledRule('ru/optalign/comma')).toBeTruthy();
    });

    it('should get/set a setting', () => {
        mainTypograf.setSetting('fake', 'value', 10);

        expect(mainTypograf.getSetting('fake', 'value')).toEqual(10);

        expect(mainTypograf.getSetting('common/nbsp/beforeShortLastWord', 'lengthLastWord')).toEqual(3);
    });

    it('should add safe tag', () => {
        const localTypograf = new Typograf({ locale: 'en-US' });
        localTypograf.addSafeTag('<myTag>', '</myTag>');

        expect(localTypograf.execute('  <myTag>  Hello world!!  </myTag>  ')).toEqual('<myTag>  Hello world!!  </myTag>');
    });

    it('should add rule', () => {
        Typograf.addRule({
            name: 'common/example',
            index: '100',
            handler: text => text.replace(/rule/, ''),
        });

        Typograf.addInnerRule({
            name: 'common/example',
            handler: text => text.replace(/inner_example/, ''),
        });

        const localTypograf = new Typograf({ locale: 'en-US' });

        expect(localTypograf.execute('rule abc inner_example')).toEqual('abc');
    });

    it('should throw error without locale', () => {
        expect(() => {
            const localTypograf = new Typograf({ locale: '' });
            localTypograf.execute('text');
        }).toThrow(/Not defined/);
    });

    it('should throw error with unknown locale', () => {
        expect(() => {
            const localTypograf = new Typograf({ locale: 'ru' });
            localTypograf.execute('text', { locale: 'unknow' });
        }).toThrow(/not supported/);
    });

    it('should remove CR', () => {
        expect(mainTypograf.execute('Line1\nLine2\nLine3')).toEqual('Line1\nLine2\nLine3');
        expect(mainTypograf.execute('Line1\r\nLine2\r\nLine3')).toEqual('Line1\nLine2\nLine3');
        expect(mainTypograf.execute('Line1\rLine2\r\nLine3')).toEqual('Line1\nLine2\nLine3');
        expect(mainTypograf.execute('Line1\rLine2\rLine3')).toEqual('Line1\nLine2\nLine3');
    });

    it('should change line endings', () => {
        const localTypograf = new Typograf({
            locale: 'en-US',
            lineEnding: 'CRLF',
        });

        expect(localTypograf.execute('Line1\rLine2\rLine3')).toEqual('Line1\r\nLine2\r\nLine3');

        expect(localTypograf.execute('Line1\nLine2\nLine3', { lineEnding: 'CR' })).toEqual('Line1\rLine2\rLine3');
        expect(localTypograf.execute('Line1\rLine2\rLine3', { lineEnding: 'LF' })).toEqual('Line1\nLine2\nLine3');
        expect(localTypograf.execute('Line1\rLine2\nLine3', { lineEnding: 'CRLF' })).toEqual('Line1\r\nLine2\r\nLine3');
    });

    it('should remove unnecessary nbsp for live mode', () => {
        const localTypograf = new Typograf({ locale: 'en-US', live: true });
        expect(localTypograf.execute('Test&nbsp;test&nbsp;test.')).toEqual('Test test test.');
    });

    it('should execute specific methods before and after a rule', () => {
        const localTypograf = new Typograf({ locale: 'en-US' });
        localTypograf.onBeforeRule = jest.fn();
        localTypograf.onAfterRule = jest.fn();
        localTypograf.execute('test');

        expect(localTypograf.onBeforeRule).toHaveBeenCalled();
        expect(localTypograf.onAfterRule).toHaveBeenCalled();
    })

    it('should correct version', () => {
        expect(Typograf.version.search(/^\d/) > -1).toBeTruthy();
    });

    it('should process separate parts', () => {
        const localTypograf = new Typograf({ locale: 'ru' });
        const result = localTypograf.execute('"Я <p> "Я" </p> Я"');

        expect('«Я <p> «Я» </p> Я»').toEqual(result);
    });

    it('should process not separate parts', () => {
        const localTypograf = new Typograf({
            locale: 'ru',
            processingSeparateParts: false,
        });

        const result = localTypograf.execute('"Я <p> "Я" </p> Я"');

        expect('«Я <p> „Я“ </p> Я»').toEqual(result);
    });
});
