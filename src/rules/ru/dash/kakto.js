import { getData } from '../../../data';

export default {
    name: 'ru/dash/kakto',
    handler(text) {
        const re = new RegExp('(^|[^А-ЯЁа-яё\\w])([Кк]ак) то' + getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2-то');
    }
};
