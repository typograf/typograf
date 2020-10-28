import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/space/delRepeatSpace',
    index: '-1',
    handler(text) {
        return text.replace(/([^\n \t])[ \t]{2,}(?![\n \t])/g, '$1 ');
    }
};

export default rule;
