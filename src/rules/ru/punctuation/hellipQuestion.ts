import { Rule } from '../../../types';

const rule: Rule = {
    name: 'ru/punctuation/hellipQuestion',
    handler(text) {
        return text
            .replace(/(^|[^.])(\.\.\.|…),/g, '$1…')
            .replace(/(!|\?)(\.\.\.|…)(?=[^.]|$)/g, '$1..');
    }
};

export default rule;
