import { DataChar, DataQuote } from '../../../data';
import type { TypografRule } from '../../../main';
export const beforeShortLastNumberRule: TypografRule<{ lengthLastNumber: number; }> = {
    name: 'common/nbsp/beforeShortLastNumber',
    handler(text, settings, context) {
        const quote = context.getData('quote') as DataQuote;
        const ch = context.getData('char') as DataChar;
        const CH = ch.toUpperCase();
        const re = new RegExp('([' + ch + CH +
            ']) (?=\\d{1,' + settings.lengthLastNumber +
            '}[-+−%\'"' + quote.right + ')]?([.!?…]( [' +
            CH + ']|$)|$))', 'gm');

        return text.replace(re, '$1\u00A0');
    },
    live: false,
    settings: {
        lengthLastNumber: 2,
    },
};
