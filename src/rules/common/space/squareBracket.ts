import type { TypografRule } from '../../../main';
export const squareBracketRule: TypografRule = {
    name: 'common/space/squareBracket',
    handler(text) {
        return text
            .replace(/(\[) +/g, '[')
            .replace(/ +\]/g, ']');
    },
};
