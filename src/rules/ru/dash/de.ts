import { Rule } from '../../../types';
import Typograf from '../../../typograf';

const rule: Rule = {
    name: 'ru/dash/de',
    handler(text) {
        const re = new RegExp('([a-яё]+) де' + Typograf.getData('ru/dashAfterDe'), 'g');

        return text.replace(re, '$1-де');
    },
    disabled: true
};

export default rule;
