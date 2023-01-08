import type { TypografRule } from '../../../main';
export const timesRule: TypografRule = {
    name: 'common/number/times',
    handler(text) {
        return text.replace(/(\d)[ \u00A0]?[xх][ \u00A0]?(\d)/g, '$1×$2');
    },
};
