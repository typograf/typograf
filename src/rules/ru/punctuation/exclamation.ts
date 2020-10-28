import { Rule } from '../../../types';

const rule: Rule = {
    name: 'ru/punctuation/exclamation',
    live: false,
    handler(text) {
        return text
            .replace(/(^|[^!])!{2}($|[^!])/gm, '$1!$2')
            .replace(/(^|[^!])!{4}($|[^!])/gm, '$1!!!$2');
    }
};

export default rule;
