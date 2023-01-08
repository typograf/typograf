import type { TypografRule } from '../../../main';
import { getData } from '../../../data';

export const takiRule: TypografRule = {
    name: 'ru/dash/taki',
    handler(text) {
        const re = new RegExp('(верно|довольно|опять|прямо|так|вс[её]|действительно|неужели)\\s(таки)' +
            getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1-$2');
    },
};
