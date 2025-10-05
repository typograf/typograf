import type { TypografRule } from '../../../main';
import { DataChar, DataCommonQuote, getData } from '../../../data';
import { privateLabel } from '../../../consts';

export const afterShortWordByListRule: TypografRule<{
    lengthShortWord: number;
}> = {
    name: 'common/nbsp/afterShortWordByList',
    handler(text, _, context) {
        const quote = getData('common/quote') as DataCommonQuote;
        const shortWord = context.getData('shortWord') as DataChar | undefined;
        const before = ' \u00A0(' + privateLabel + quote;
        const subStr = '(^|[' + before + '])(' + shortWord + ') ';
        const newSubStr = '$1$2\u00A0';
        const re = new RegExp(subStr, 'gim');

        return text
            .replace(re, newSubStr)
            .replace(re, newSubStr);
    },
};
