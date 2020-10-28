import { Rule } from '../../../types';
import Typograf from '../../../typograf';

const rule: Rule = {
    name: 'ru/dash/ka',
    handler(text) {
        const re = new RegExp('([a-яё]+) ка(сь)?' + Typograf.getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1-ка$2');
    }
};

export default rule;
