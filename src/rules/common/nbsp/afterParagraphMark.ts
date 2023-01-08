import type { TypografRule } from '../../../main';
export const afterParagraphMarkRule: TypografRule = {
    name: 'common/nbsp/afterParagraphMark',
    handler(text) {
        return text.replace(/¶ ?(?=\d)/g, '¶\u00A0');
    },
};
