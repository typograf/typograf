import type { TypografRule } from '../../../main';
import { getData } from '../../../data';

export const decadeRule: TypografRule<{ dash: string; }> = {
    name: 'ru/dash/decade',
    handler(text, settings) {
        const re = new RegExp('(^|\\s)(\\d{3}|\\d)0' +
                '(' + getData('common/dash') + ')' +
                '(\\d{3}|\\d)0(-е[ \u00A0])' +
                '(?=г\\.?[ \u00A0]?г|год)', 'g');

        return text.replace(re, '$1$20' + settings.dash + '$40$5');
    },
    settings: {
        dash: '\u2013', // &ndash;
    },
};
