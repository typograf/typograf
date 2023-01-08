import type { TypografRule } from '../../../main';
export const nbrRule: TypografRule = {
    name: 'common/html/nbr',
    index: '+10',
    queue: 'end',
    handler(text) {
        return text.replace(/([^\n>])\n(?=[^\n])/g, '$1<br/>\n');
    },
    disabled: true,
    htmlAttrs: false,
};
