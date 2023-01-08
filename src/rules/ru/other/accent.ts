import type { TypografRule } from '../../../main';
export const accentRule: TypografRule = {
    name: 'ru/other/accent',
    handler(text) {
        return text.replace(/([а-яё])([АЕЁИОУЫЭЮЯ])([^А-ЯЁ\w]|$)/g, function($0, $1, $2, $3) {
            return $1 + $2.toLowerCase() + '\u0301' + $3;
        });
    },
    disabled: true,
};
