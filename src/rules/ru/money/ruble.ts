import type { TypografRule } from '../../../main';
export const rubleRule: TypografRule = {
    name: 'ru/money/ruble',
    handler(text) {
        const newSubstr = '$1\u00A0₽';
			  const commonPart = '(\\d+)\\s*(руб|Руб|Р|р)\\.?';
        const re1 = new RegExp('^' + commonPart + '$', 'g');
        const re2 = new RegExp(commonPart + '(?=[!?,:;])', 'g');
        const re3 = new RegExp(commonPart + '(?=\\s+[A-ЯЁ])', 'g');

        return text
            .replace(re1, newSubstr)
            .replace(re2, newSubstr)
            .replace(re3, newSubstr + '.');
    },
    disabled: true,
};
