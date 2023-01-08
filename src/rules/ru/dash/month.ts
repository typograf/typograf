import type { TypografRule } from '../../../main';
import { getData } from '../../../data';

export const monthRule: TypografRule<{ dash: string; }> = {
    name: 'ru/dash/month',
    handler(text, settings) {
        const months = '(' + getData('ru/month') + ')';
        const monthsPre = '(' + getData('ru/monthPreCase') + ')';
        const dashes = getData('common/dash');
        const re = new RegExp(months + ' ?(' + dashes + ') ?' + months, 'gi');
        const rePre = new RegExp(monthsPre + ' ?(' + dashes + ') ?' + monthsPre, 'gi');
        const newSubStr = '$1' + settings.dash + '$3';

        return text
            .replace(re, newSubStr)
            .replace(rePre, newSubStr);
    },
    settings: {
        dash: '\u2013', // &ndash;
    },
};
