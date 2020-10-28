import { Rule } from '../../../types';
import Typograf from '../../../typograf';

const rule: Rule<{ dash: string }> = {
    name: 'ru/dash/month',
    handler(text, settings) {
        const months = '(' + Typograf.getData('ru/month') + ')';
        const monthsPre = '(' + Typograf.getData('ru/monthPreCase') + ')';
        const dashes = Typograf.getData('common/dash');
        const re = new RegExp(months + ' ?(' + dashes + ') ?' + months, 'gi');
        const rePre = new RegExp(monthsPre + ' ?(' + dashes + ') ?' + monthsPre, 'gi');
        const newSubStr = '$1' + settings.dash + '$3';

        return text
            .replace(re, newSubStr)
            .replace(rePre, newSubStr);
    },
    settings: {
        dash: '\u2013' // &ndash;
    }
};

export default rule;
