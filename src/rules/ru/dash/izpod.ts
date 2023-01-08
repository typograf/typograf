import type { TypografRule } from '../../../main';
import { getData } from '../../../data';

export const izpodRule: TypografRule = {
    name: 'ru/dash/izpod',
    handler(text) {
        const re = new RegExp(getData('ru/dashBefore') + '(И|и)з под' + getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2з-под');
    },
};
