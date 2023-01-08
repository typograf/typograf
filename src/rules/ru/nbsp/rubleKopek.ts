import type { TypografRule } from '../../../main';
export const rubleKopekRule: TypografRule = {
    name: 'ru/nbsp/rubleKopek',
    handler(text) {
        return text.replace(/(\d) ?(?=(руб|коп)\.)/g, '$1\u00A0');
    },
};
