import { Rule } from '../../../types';
import Typograf from '../../../typograf';

const rule: Rule<{ dash: string }> = {
    name: 'ru/dash/daysMonth',
    handler(text, settings) {
        const re = new RegExp('(^|\\s)([123]?\\d)' +
                '(' + Typograf.getData('common/dash') + ')' +
                '([123]?\\d)[ \u00A0]' +
                '(' + Typograf.getData('ru/monthGenCase') + ')', 'g');

        return text.replace(re, '$1$2' + settings.dash + '$4\u00A0$5');
    },
    settings: {
        dash: '\u2013' // &ndash;
    }
};

export default rule;
