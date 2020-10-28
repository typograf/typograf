import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/space/beforeBracket',
    handler(text, settings, context) {
        const re = new RegExp('([' + context.getCharData() + '.!?,;…)])\\(', 'gi');

        return text.replace(re, '$1 (');
    }
};

export default rule;
