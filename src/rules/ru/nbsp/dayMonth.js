import { getData } from '../../../data';

export default {
    name: 'ru/nbsp/dayMonth',
    handler(text) {
        const re = new RegExp('(\\d{1,2}) (' + getData('ru/shortMonth') + ')', 'gi');

        return text.replace(re, '$1\u00A0$2');
    }
};
