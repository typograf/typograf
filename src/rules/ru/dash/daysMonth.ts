import type { TypografRule } from '../../../main';
import { getData } from '../../../data';

export const daysMonthRule: TypografRule<{ dash: string; }> = {
    name: 'ru/dash/daysMonth',
    handler(text, settings) {
        const re = new RegExp('(^|\\s)([123]?\\d)' +
                '(' + getData('common/dash') + ')' +
                '([123]?\\d)[ \u00A0]' +
                '(' + getData('ru/monthGenCase') + ')', 'g');

        return text.replace(re, '$1$2' + settings.dash + '$4\u00A0$5');
    },
    settings: {
        dash: '\u2013', // &ndash;
    },
};
