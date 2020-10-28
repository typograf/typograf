import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/html/stripTags',
    index: '+99',
    queue: 'end',
    handler(text) {
        return text.replace(/<[^>]+>/g, '');
    },
    disabled: true
};

export default rule;
