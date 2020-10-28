import { Rule } from '../../../types';
import Typograf from '../../../typograf';

const rule: Rule = {
    name: 'ru/nbsp/dayMonth',
    handler(text) {
        const re = new RegExp('(\\d{1,2}) (' + Typograf.getData('ru/shortMonth') + ')', 'gi');

        return text.replace(re, '$1\u00A0$2');
    }
};

export default rule;
