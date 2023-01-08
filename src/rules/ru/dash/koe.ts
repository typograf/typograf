import type { TypografRule } from '../../../main';
import { getData } from '../../../data';

export const koeRule: TypografRule = {
    name: 'ru/dash/koe',
    handler(text) {
        const re = new RegExp(getData('ru/dashBefore') +
            '([Кк]о[ей])\\s([а-яё]{3,})' +
            getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2-$3');
    },
};
