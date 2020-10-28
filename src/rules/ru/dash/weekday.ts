import { Rule } from '../../../types';
import Typograf from '../../../typograf';

const rule: Rule<{ dash: string }> = {
    name: 'ru/dash/weekday',
    handler(text, settings) {
        const part = '(' + Typograf.getData('ru/weekday') + ')';
        const re = new RegExp(part + ' ?(' + Typograf.getData('common/dash') + ') ?' + part, 'gi');

        return text.replace(re, '$1' + settings.dash + '$3');
    },
    settings: {
        dash: '\u2013' // &ndash;
    }
};

export default rule;
