import type { TypografRule } from '../../../main';
export const delLeadingBlanksRule: TypografRule = {
    name: 'common/space/delLeadingBlanks',
    handler(text) {
        return text.replace(/^[ \t]+/mg, '');
    },
    disabled: true,
};
