import type { TypografRule } from '../../../main';
export const delRepeatSpaceRule: TypografRule = {
    name: 'common/space/delRepeatSpace',
    index: '-1',
    handler(text) {
        return text.replace(/([^\n \t])[ \t]{2,}(?![\n \t])/g, '$1 ');
    },
};
