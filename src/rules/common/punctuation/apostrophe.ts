import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/punctuation/apostrophe',
    handler(text, settings, context) {
        const letters = '([' + context.getCharData() + '])';
        const re = new RegExp(letters + '\'' + letters, 'gi');

        return text.replace(re, '$1’$2');
    }
};

export default rule;
