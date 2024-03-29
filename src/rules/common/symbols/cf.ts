import type { TypografRule } from '../../../main';
export const cfRule: TypografRule = {
    name: 'common/symbols/cf',
    handler(text) {
        const re = new RegExp('(^|[\\s(\\[+≈±−—–\\-])(\\d+(?:[.,]\\d+)?)[ \u00A0\u2009]?(C|F)([\\W\\s.,:!?")\\]]|$)', 'mg');

        return text.replace(re, '$1$2\u2009°$3$4');
    },
};
