import type { TypografRule } from '../../../main';
export const delTrailingBlanksRule: TypografRule = {
    name: 'common/space/delTrailingBlanks',
    index: '-3',
    handler(text) {
        return text.replace(/[ \t]+\n/g, '\n');
    },
};
