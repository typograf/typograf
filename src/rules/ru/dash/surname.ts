import type { TypografRule } from '../../../main';
export const surnameRule: TypografRule = {
    name: 'ru/dash/surname',
    handler(text) {
        const re = new RegExp('([А-ЯЁ][а-яё]+)\\s-([а-яё]{1,3})(?![^а-яё]|$)', 'g');

        return text.replace(re, '$1\u00A0\u2014$2');
    },
};
