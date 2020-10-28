import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/nbsp/afterNumber',
    handler(text, settings, context) {
        const re = '(^|\\D)(\\d{1,5}) ([' +
            context.getCharData() +
            ']+)';

        return text.replace(new RegExp(re, 'gi'), '$1$2\u00A0$3');
    },
    disabled: true
};

export default rule;
