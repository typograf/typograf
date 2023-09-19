import type { TypografRule } from '../../../main';
import { DataChar, DataCommonQuote, getData } from '../../../data';
import { privateLabel } from '../../../consts';

export const afterShortWordRule: TypografRule<{
    lengthShortWord: number;
    useShortWordList: boolean;
}> = {
    name: 'common/nbsp/afterShortWord',
    handler(text, settings, context) {
        const { lengthShortWord, useShortWordList } = settings;
        const quote = getData('common/quote') as DataCommonQuote;
        const char = context.getData('char') as DataChar;
        const shortWord = context.getData('shortWord') as DataChar | undefined;
        const before = ' \u00A0(' + privateLabel + quote;
        const subStr = useShortWordList && shortWord !== undefined
            ? '(^|[' + before + '])(' + shortWord + ') '
            : '(^|[' + before + '])([' + char + ']{1,' + lengthShortWord + '}) ';
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
