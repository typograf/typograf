import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/space/delLeadingBlanks',
    handler(text) {
        return text.replace(/^[ \t]+/mg, '');
    },
    disabled: true
};

export default rule;
