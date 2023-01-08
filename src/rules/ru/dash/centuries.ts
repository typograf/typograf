import type { TypografRule } from '../../../main';
import { getData } from '../../../data';

export const centuriesRule: TypografRule<{ dash: string; }> = {
    name: 'ru/dash/centuries',
    handler(text, settings) {
        const dashes = '(' + getData('common/dash') + ')';
        const re = new RegExp('(X|I|V)[ |\u00A0]?' + dashes + '[ |\u00A0]?(X|I|V)', 'g');

        return text.replace(re, '$1' + settings.dash + '$3');
    },
    settings: {
        dash: '\u2013', // &ndash;
    },
};
