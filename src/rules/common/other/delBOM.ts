import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/other/delBOM',
    queue: 'start',
    index: -1,
    handler(text) {
        if (text.charCodeAt(0) === 0xFEFF) {
            return text.slice(1);
        }

        return text;
    }
};

export default rule;
