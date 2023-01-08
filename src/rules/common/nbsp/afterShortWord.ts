import type { TypografRule } from '../../../main';
import { DataChar, DataCommonQuote, getData } from '../../../data';
import { privateLabel } from '../../../consts';

export const afterShortWordRule: TypografRule<{ lengthShortWord: number; }> = {
    name: 'common/nbsp/afterShortWord',
    handler(text, settings, context) {
        const len = settings.lengthShortWord;
        const quote = getData('common/quote') as DataCommonQuote;
        const char = context.getData('char') as DataChar;
        const before = ' \u00A0(' + privateLabel + quote;
        const subStr = '(^|[' + before + '])([' + char + ']{1,' + len + '}) ';
        const newSubStr = '$1$2\u00A0';
        const re = new RegExp(subStr, 'gim');

        return text
            .replace(re, newSubStr)
            .replace(re, newSubStr);
    },
    settings: {
        lengthShortWord: 2,
    },
};
