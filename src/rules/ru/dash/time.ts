import type { TypografRule } from '../../../main';
import { getData } from '../../../data';

export const timeRule: TypografRule<{ dash: string; }> = {
    name: 'ru/dash/time',
    handler(text, settings) {
        const re = new RegExp(getData('ru/dashBefore') +
            '(\\d?\\d:[0-5]\\d)' +
            getData('common/dash') +
            '(\\d?\\d:[0-5]\\d)' +
            getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2' + settings.dash + '$3');
    },
    settings: {
        dash: '\u2013', // &ndash;
    },
};
