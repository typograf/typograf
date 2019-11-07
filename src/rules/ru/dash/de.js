import { getData } from '../../../data';

export default {
    name: 'ru/dash/de',
    handler(text) {
        const re = new RegExp('([a-яё]+) де' + getData('ru/dashAfterDe'), 'g');

        return text.replace(re, '$1-де');
    },
    disabled: true
};
