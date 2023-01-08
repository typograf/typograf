import type { TypografRule } from '../../../main';
import { getData } from '../../../data';

export const mainRule: TypografRule = {
    name: 'ru/dash/main',
    index: '-5',
    handler(text) {
        const dashes = getData('common/dash');
        const re = new RegExp('([ \u00A0])(' + dashes + ')([ \u00A0\\n])', 'g');

        return text.replace(re, '\u00A0\u2014$3');
    },
};
