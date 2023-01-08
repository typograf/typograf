import type { TypografRule } from '../../../main';
export const delBetweenExclamationMarksRule: TypografRule = {
    name: 'common/space/delBetweenExclamationMarks',
    handler(text) {
        return text.replace(/([!?]) (?=[!?])/g, '$1');
    },
};
