import { Rule } from '../../../types';
import Typograf from '../../../typograf';

const rule: Rule = {
    name: 'ru/dash/main',
    index: '-5',
    handler(text) {
        const dashes = Typograf.getData('common/dash');
        const re = new RegExp('([ \u00A0])(' + dashes + ')([ \u00A0\\n])', 'g');

        return text.replace(re, '\u00A0\u2014$3');
    }
};

export default rule;
