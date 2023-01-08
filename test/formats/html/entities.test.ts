import { TypografExecutePrefs } from '../../../src/main';
import Typograf from '../../../src/typograf';

describe('HTML Entities', () => {
    it('should get entities as name or digit', () => {
        const nameTypograf = new Typograf({ locale: 'en-US', htmlEntity: { type: 'name' }});
        expect(nameTypograf.execute('1\u00A02')).toEqual('1&nbsp;2');
        expect(nameTypograf.execute('1&#160;2')).toEqual('1&nbsp;2');

        const digitTypograf = new Typograf({ locale: 'en-US', htmlEntity: { type: 'digit' }});
        expect(digitTypograf.execute('1\u00A02')).toEqual('1&#160;2');
        expect(digitTypograf.execute('1&nbsp;2')).toEqual('1&#160;2');
    });

    it('should get entities as name or digit with method "execute"', () => {
        const nameTypograf = new Typograf({ locale: 'ru' });
        const namePrefs: TypografExecutePrefs = { locale: 'en-US', htmlEntity: {type: 'name' }};
        expect(nameTypograf.execute('1\u00A02\u00A03', namePrefs)).toEqual('1&nbsp;2&nbsp;3');
        expect(nameTypograf.execute('1&#160;2&#160;3', namePrefs)).toEqual('1&nbsp;2&nbsp;3');
        expect(nameTypograf.execute('1&#xA0;2&#160;3', namePrefs)).toEqual('1&nbsp;2&nbsp;3');
        expect(nameTypograf.execute('1&#xa0;2&#160;3', namePrefs)).toEqual('1&nbsp;2&nbsp;3');
        expect(nameTypograf.execute('1&#xa0;2&#xa0;3', namePrefs)).toEqual('1&nbsp;2&nbsp;3');

        const digitTypograf = new Typograf({ locale: 'ru' });
        const digitPrefs: TypografExecutePrefs = { locale: 'en-US', htmlEntity: { type: 'digit' }};
        expect(digitTypograf.execute('1\u00A02\u00A03', digitPrefs)).toEqual('1&#160;2&#160;3');
        expect(digitTypograf.execute('1&nbsp;2&nbsp;3', digitPrefs)).toEqual('1&#160;2&#160;3');
        expect(digitTypograf.execute('1&#xa0;2&nbsp;3', digitPrefs)).toEqual('1&#160;2&#160;3');
        expect(digitTypograf.execute('1&#xa0;2&#160;3', digitPrefs)).toEqual('1&#160;2&#160;3');
        expect(digitTypograf.execute('1&#xa0;2&#xa0;3', digitPrefs)).toEqual('1&#160;2&#160;3');
        expect(digitTypograf.execute('1&#XA0;2&#XA0;3', digitPrefs)).toEqual('1&#160;2&#160;3');
    });

    it('should get entities as name only for invisible symbols', () => {
        const localTypograf = new Typograf({
            locale: 'en-US',
            htmlEntity: {
                type: 'name',
                onlyInvisible: true,
            },
        });

        expect(localTypograf.execute('1\u00A02… a\u00A0b…')).toEqual('1&nbsp;2… a&nbsp;b…');
    });

    it('should get entities as digit only for invisible symbols', () => {
        const localTypograf = new Typograf({ locale: 'en-US', htmlEntity: { type: 'digit', onlyInvisible: true }});
        expect(localTypograf.execute('1\u00A02… a\u00A0b…')).toEqual('1&#160;2… a&#160;b…');
    });

    it('should get entities as digit only for own list', () => {
        const localTypograf = new Typograf({
            locale: 'en-US',
            htmlEntity: {
                type: 'digit',
                list: ['hellip'],
            },
        });

        expect(localTypograf.execute('1\u00A02… a\u00A0b…')).toEqual('1\u00A02&#8230; a\u00A0b&#8230;');
    });
});
