import { Rule } from '../../../types';
import Typograf from '../../../typograf';
import { privateLabel } from '../../../consts';

const rule: Rule<{ lengthShortWord: number }> = {
    name: 'common/nbsp/afterShortWord',
    handler(text, settings, context) {
        const len = settings.lengthShortWord;
        const before = ' \u00A0(' + privateLabel + Typograf.getData('common/quote');
        const subStr = '(^|[' + before + '])([' + context.getCharData() + ']{1,' + len + '}) ';
        const newSubStr = '$1$2\u00A0';
        const re = new RegExp(subStr, 'gim');

        return text
            .replace(re, newSubStr)
            .replace(re, newSubStr);
    },
    settings: {
        lengthShortWord: 2
    }
};

export default rule;
