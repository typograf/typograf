import type { TypografRule } from '../../../main';
import { DataChar, DataCommonQuote, getData } from '../../../data';
import { privateLabel } from '../../../consts';

export const afterShortWordRule: TypografRule<{
    lengthShortWord: number;
    useShortWordList: boolean;
}> = {
    name: 'common/nbsp/afterShortWord',
    handler(text, settings, context) {
        const {lengthShortWord: len, useShortWordList} = settings;
        const quote = getData('common/quote') as DataCommonQuote;
        const before = ' \u00A0(' + privateLabel + quote;
        let subStr;

        if (useShortWordList) {
            const shortWords = context.getData('shortWord');
            subStr = '(^|[' + before + '])(' + shortWords + ') ';
        } else {
            const char = context.getData('char') as DataChar;
            subStr = '(^|[' + before + '])([' + char + ']{1,' + len + '}) ';
        }

        const newSubStr = '$1$2\u00A0';
        const re = new RegExp(subStr, 'gim');

        return text
            .replace(re, newSubStr)
            .replace(re, newSubStr);
    },
    settings: {
        lengthShortWord: 2,
        useShortWordList: false,
    },
};
