import { Rule } from '../../../types';

const rule: Rule = {
    name: 'ru/other/accent',
    handler(text) {
        return text.replace(/([а-яё])([АЕЁИОУЫЭЮЯ])([^А-ЯЁ\w]|$)/g, ($0, $1: string, $2: string, $3: string) => {
            return $1 + $2.toLowerCase() + '\u0301' + $3;
        });
    },
    disabled: true
};

export default rule;
