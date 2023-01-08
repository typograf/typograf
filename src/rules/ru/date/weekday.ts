import type { TypografRule } from '../../../main';
import { getData } from '../../../data';

export const weekdayRule: TypografRule = {
    name: 'ru/date/weekday',
    handler(text) {
        const space = '( |\u00A0)';
        const monthCase = getData('ru/monthGenCase');
        const weekday = getData('ru/weekday');
        const re = new RegExp('(\\d)' + space + '(' + monthCase + '),' + space + '(' + weekday + ')', 'gi');

        return text.replace(re, (_, $1, $2, $3, $4, $5) => {
            return $1 + $2 + $3.toLowerCase() + ',' + $4 + $5.toLowerCase();
        });
    },
};
