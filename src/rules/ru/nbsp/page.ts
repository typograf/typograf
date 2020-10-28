import { Rule } from '../../../types';
import { privateLabel } from '../../../consts';

const rule: Rule = {
    name: 'ru/nbsp/page',
    handler(text) {
        const re = new RegExp('(^|[)\\s' + privateLabel + '])' +
            '(стр|гл|рис|илл?|ст|п|c)\\. *(\\d+)([\\s.,?!;:]|$)', 'gim');

        return text.replace(re, '$1$2.\u00A0$3$4');
    }
};

export default rule;
