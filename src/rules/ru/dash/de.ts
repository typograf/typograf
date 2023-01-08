import type { TypografRule } from '../../../main';
import { getData } from '../../../data';

export const deRule: TypografRule = {
    name: 'ru/dash/de',
    handler(text) {
        const re = new RegExp('([a-яё]+) де' + getData('ru/dashAfterDe'), 'g');

        return text.replace(re, '$1-де');
    },
    disabled: true,
};
