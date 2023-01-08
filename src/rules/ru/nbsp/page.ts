import type { TypografRule } from '../../../main';
import { privateLabel } from '../../../consts';

export const pageRule: TypografRule = {
    name: 'ru/nbsp/page',
    handler(text) {
        const re = new RegExp('(^|[)\\s' + privateLabel + '])' +
            '(стр|гл|рис|илл?|ст|п|c)\\. *(\\d+)([\\s.,?!;:]|$)', 'gim');

        return text.replace(re, '$1$2.\u00A0$3$4');
    },
};
