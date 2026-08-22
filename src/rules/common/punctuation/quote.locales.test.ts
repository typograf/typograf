import Typograf from '../../../typograf';

const localeQuotes = [
    ['be', '«a „b «c» b“ a»'],
    ['bg', '„a „b „c“ b“ a“'],
    ['ca', '«a “b ‘c’ b” a»'],
    ['cs', '„a ‚b »c« b‘ a“'],
    ['da', '»a »b »c« b« a«'],
    ['de', '„a ‚b ‚c‘ b‘ a“'],
    ['el', '«a “b ‘c’ b” a»'],
    ['en-GB', '‘a “b ‘c’ b” a’'],
    ['en-US', '“a ‘b “c” b’ a”'],
    ['eo', '“a ‘b “c” b’ a”'],
    ['es', '«a “b ‘c’ b” a»'],
    ['et', '„a „b „c“ b“ a“'],
    ['fi', '”a ’b ’c’ b’ a”'],
    ['fr', '«\u202Fa “b ‘c’ b” a\u202F»'],
    ['ga', '‘a “b ‘c’ b” a’'],
    ['hu', '„a »b ’c’ b« a”'],
    ['it', '«a “b ‘c’ b” a»'],
    ['lv', '“a “b “c” b” a”'],
    ['nl', '‘a “b ‘c’ b” a’'],
    ['no', '«a ‘b «c» b’ a»'],
    ['pl', '„a «b ‘c’ b» a”'],
    ['ro', '„a «b „c” b» a”'],
    ['ru', '«a „b ‚c‘ b“ a»'],
    ['sk', '„a ‚b »c« b‘ a“'],
    ['sl', '„a ‚b ‚c‘ b‘ a“'],
    ['sr', '„a ’b ’c’ b’ a”'],
    ['sv', '”a ’b ’c’ b’ a”'],
    ['tr', '“a ‘b “c” b’ a”'],
    ['uk', '«a „b «c» b“ a»'],
];

function createTypograf(locale: string): Typograf {
    return new Typograf({
        locale,
        disableRule: '*',
        enableRule: 'common/punctuation/quote',
    });
}

describe('common/punctuation/quote locales', () => {
    it.each(localeQuotes)('%s: formats three levels', (locale, expected) => {
        const tp = createTypograf(locale);
        const result = tp.execute('"a "b "c" b" a"');

        expect(result).toBe(expected);
        expect(tp.execute(result)).toBe(expected);
    });

    it('keeps levels balanced after the configured depth', () => {
        const tp = createTypograf('en-US');

        expect(tp.execute('"a "b "c "d" c" b" a"')).toBe('“a ‘b “c “d” c” b’ a”');
    });

    it.each(['en-GB', 'nl'])('%s: handles a straight quote inside preformatted outer quotes', locale => {
        const tp = createTypograf(locale);

        expect(tp.execute('‘outer "inner"’')).toBe('‘outer “inner”’');
    });
});
