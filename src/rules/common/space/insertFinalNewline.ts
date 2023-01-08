import type { TypografRule } from '../../../main';
export const insertFinalNewlineRule: TypografRule = {
    name: 'common/space/insertFinalNewline',
    queue: 'end',
    handler(text) {
        return text[text.length - 1] === '\n' ? text : text + '\n';
    },
    live: false,
    disabled: true,
};
