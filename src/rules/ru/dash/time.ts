import { Rule } from '../../../types';
import Typograf from '../../../typograf';

const rule: Rule<{ dash: string }> = {
    name: 'ru/dash/time',
    handler(text, settings) {
        const re = new RegExp(Typograf.getData('ru/dashBefore') +
            '(\\d?\\d:[0-5]\\d)' +
            Typograf.getData('common/dash') +
            '(\\d?\\d:[0-5]\\d)' +
            Typograf.getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2' + settings.dash + '$3');
    },
    settings: {
        dash: '\u2013' // &ndash;
    }
};

export default rule;
