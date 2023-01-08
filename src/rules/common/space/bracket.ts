import type { TypografRule } from '../../../main';
export const bracketRule: TypografRule = {
    name: 'common/space/bracket',
    handler(text) {
        return text
            .replace(/(\() +/g, '(')
            .replace(/ +\)/g, ')');
    },
};
