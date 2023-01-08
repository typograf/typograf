import type { TypografRule } from '../../../main';
export const replaceTabRule: TypografRule = {
    name: 'common/space/replaceTab',
    index: '-5',
    handler(text) {
        return text.replace(/\t/g, '    ');
    },
};
