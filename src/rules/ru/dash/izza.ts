import { Rule } from '../../../types';
import Typograf from '../../../typograf';

const rule: Rule = {
    name: 'ru/dash/izza',
    handler(text) {
        const re = new RegExp(Typograf.getData('ru/dashBefore') + '(И|и)з за' + Typograf.getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2з-за');
    }
};

export default rule;
