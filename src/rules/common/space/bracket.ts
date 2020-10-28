import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/space/bracket',
    handler(text) {
        return text
            .replace(/(\() +/g, '(')
            .replace(/ +\)/g, ')');
    }
};

export default rule;
