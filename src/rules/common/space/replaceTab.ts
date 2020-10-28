import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/space/replaceTab',
    index: '-5',
    handler(text) {
        return text.replace(/\t/g, '    ');
    }
};

export default rule;
