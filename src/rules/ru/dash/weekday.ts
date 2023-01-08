import type { TypografRule } from '../../../main';
import { getData } from '../../../data';

export const weekdayRule: TypografRule<{ dash: string;}> = {
    name: 'ru/dash/weekday',
    handler(text, settings) {
        const part = '(' + getData('ru/weekday') + ')';
        const re = new RegExp(part + ' ?(' + getData('common/dash') + ') ?' + part, 'gi');

        return text.replace(re, '$1' + settings.dash + '$3');
    },
    settings: {
        dash: '\u2013', // &ndash;
    },
};
