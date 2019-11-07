import Typograf from '../../../typograf';

export default {
    name: 'common/nbsp/afterShortWord',
    handler(text, settings, context) {
        const len = settings.lengthShortWord;
        const before = ' \u00A0(' + Typograf._privateLabel + Typograf.getData('common/quote');
        const subStr = '(^|[' + before + '])([' + context.getData('char') + ']{1,' + len + '}) ';
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
