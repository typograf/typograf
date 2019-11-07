import { getData } from '../../../data';

export default {
    name: 'ru/date/weekday',
    handler(text) {
        const space = '( |\u00A0)';
        const monthCase = getData('ru/monthGenCase');
        const weekday = getData('ru/weekday');
        const re = new RegExp('(\\d)' + space + '(' + monthCase + '),' + space + '(' + weekday + ')', 'gi');

        return text.replace(re, function() {
            const a = arguments;
            return a[1] + a[2] + a[3].toLowerCase() + ',' + a[4] + a[5].toLowerCase();
        });
    }
};
