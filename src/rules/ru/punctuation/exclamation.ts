import type { TypografRule } from '../../../main';
export const exclamationRule: TypografRule = {
    name: 'ru/punctuation/exclamation',
    handler(text) {
        return text
            .replace(/(^|[^!])!{2}($|[^!])/gm, '$1!$2')
            .replace(/(^|[^!])!{4}($|[^!])/gm, '$1!!!$2');
    },
    live: false,
};
