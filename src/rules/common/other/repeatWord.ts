import { Rule } from '../../../types';
import Typograf from '../../../typograf';

const rule: Rule<{ min: number }> = {
    name: 'common/other/repeatWord',
    handler(text, settings, context) {
        const punc = '[;:,.?! \n' + Typograf.getData('common/quote') + ']';
        const re = new RegExp('(' + punc + '|^)' +
            '([' + context.getCharData() + ']{' + settings.min + ',}) ' +
            '\\2(' + punc + '|$)', 'gi');

        return text.replace(re, '$1$2$3');
    },
    settings: { min: 2 },
    disabled: true
};

export default rule;
