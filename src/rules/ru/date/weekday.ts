import { Rule } from '../../../types';
import Typograf from '../../../typograf';

const rule: Rule = {
    name: 'ru/date/weekday',
    handler(text) {
        const space = '( |\u00A0)';
        const monthCase = Typograf.getData<string>('ru/monthGenCase');
        const weekday = Typograf.getData<string>('ru/weekday');
        const re = new RegExp('(\\d)' + space + '(' + monthCase + '),' + space + '(' + weekday + ')', 'gi');

        return text.replace(re, (...params) => {
            return params[1] + params[2] + params[3].toLowerCase() + ',' + params[4] + params[5].toLowerCase();
        });
    }
};

export default rule;
