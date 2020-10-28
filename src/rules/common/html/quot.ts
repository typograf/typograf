import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/html/quot',
    queue: 'hide-safe-tags',
    handler(text) {
        return text.replace(/&quot;/g, '"');
    }
};

export default rule;
