import type { TypografRule } from '../../../main';
import { DataChar, DataCommonQuote, getData } from '../../../data';

export const repeatWordRule: TypografRule<{ min: number; }> = {
    name: 'common/other/repeatWord',
    handler(text, settings, context) {
        const quote = getData('common/quote') as DataCommonQuote;
        const char = context.getData('char') as DataChar;
        const punc = '[;:,.?! \u00a0\n' + quote + ']';
        const re = new RegExp('(' + punc + '|^)' +
            '([' + char + ']{' + settings.min + ',})[ \u00a0]' +
            '\\2(' + punc + '|$)', 'gi');

        return text.replace(re, '$1$2$3');
    },
    settings: { min: 2 },
    disabled: true,
};
