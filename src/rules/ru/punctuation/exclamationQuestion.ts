import { Rule } from '../../../types';

const rule: Rule = {
    name: 'ru/punctuation/exclamationQuestion',
    index: '+5',
    handler(text) {
        const re = new RegExp('(^|[^!])!\\?([^?]|$)', 'g');

        return text.replace(re, '$1?!$2');
    }
};

export default rule;
