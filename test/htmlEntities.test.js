import Typograf from '../build/typograf';

describe('HTML Entities', () => {
    it('should get entities as name or digit', () => {
        const tName = new Typograf({locale: 'en-US', htmlEntity: {type: 'name'}});
        expect(tName.execute('1\u00A02')).toEqual('1&nbsp;2');
        expect(tName.execute('1&#160;2')).toEqual('1&nbsp;2');

        const tDigit = new Typograf({locale: 'en-US', htmlEntity: {type: 'digit'}});
        expect(tDigit.execute('1\u00A02')).toEqual('1&#160;2');
        expect(tDigit.execute('1&nbsp;2')).toEqual('1&#160;2');
    });

    it('should get entities as name or digit with method "execute"', () => {
        const tName = new Typograf();
        const nameParams = {locale: 'en-US', htmlEntity: {type: 'name'}};
        expect(tName.execute('1\u00A02\u00A03', nameParams)).toEqual('1&nbsp;2&nbsp;3');
        expect(tName.execute('1&#160;2&#160;3', nameParams)).toEqual('1&nbsp;2&nbsp;3');
        expect(tName.execute('1&#xA0;2&#160;3', nameParams)).toEqual('1&nbsp;2&nbsp;3');
        expect(tName.execute('1&#xa0;2&#160;3', nameParams)).toEqual('1&nbsp;2&nbsp;3');
        expect(tName.execute('1&#xa0;2&#xa0;3', nameParams)).toEqual('1&nbsp;2&nbsp;3');

        const tDigit = new Typograf();
        const digitParams = {locale: 'en-US', htmlEntity: {type: 'digit'}};
        expect(tDigit.execute('1\u00A02\u00A03', digitParams)).toEqual('1&#160;2&#160;3');
        expect(tDigit.execute('1&nbsp;2&nbsp;3', digitParams)).toEqual('1&#160;2&#160;3');
        expect(tDigit.execute('1&#xa0;2&nbsp;3', digitParams)).toEqual('1&#160;2&#160;3');
        expect(tDigit.execute('1&#xa0;2&#160;3', digitParams)).toEqual('1&#160;2&#160;3');
        expect(tDigit.execute('1&#xa0;2&#xa0;3', digitParams)).toEqual('1&#160;2&#160;3');
        expect(tDigit.execute('1&#XA0;2&#XA0;3', digitParams)).toEqual('1&#160;2&#160;3');
    });

    it('should get entities as name only for invisible symbols', () => {
        const t = new Typograf({locale: 'en-US', htmlEntity: {type: 'name', onlyInvisible: true}});
        expect(t.execute('1\u00A02… a\u00A0b…')).toEqual('1&nbsp;2… a&nbsp;b…');
    });

    it('should get entities as digit only for invisible symbols', () => {
        const t = new Typograf({locale: 'en-US', htmlEntity: {type: 'digit', onlyInvisible: true}});
        expect(t.execute('1\u00A02… a\u00A0b…')).toEqual('1&#160;2… a&#160;b…');
    });

    it('should get entities as digit only for own list', () => {
        const t = new Typograf({locale: 'en-US', htmlEntity: {type: 'digit', list: [ 'hellip' ]}});
        expect(t.execute('1\u00A02… a\u00A0b…')).toEqual('1\u00A02&#8230; a\u00A0b&#8230;');
    });
});
