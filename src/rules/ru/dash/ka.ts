import type { TypografRule } from '../../../main';
import { getData } from '../../../data';

export const kaRule: TypografRule = {
    name: 'ru/dash/ka',
    handler(text) {
        const re = new RegExp('([a-яё]+) ка(сь)?' + getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1-ка$2');
    },
};
