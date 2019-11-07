import { getData } from '../../../data';

export default {
    name: 'ru/dash/ka',
    handler(text) {
        const re = new RegExp('([a-яё]+) ка(сь)?' + getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1-ка$2');
    }
};
