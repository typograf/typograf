import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/number/times',
    handler(text) {
        return text.replace(/(\d)[ \u00A0]?[xх][ \u00A0]?(\d)/g, '$1×$2');
    }
};

export default rule;
