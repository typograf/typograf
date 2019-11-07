import { privateLabel } from '../../../consts';
import { removeOptAlignTags, removeOptAlignTagsFromTitle } from './helpers';

const classNames = [
    'typograf-oa-lquote',
    'typograf-oa-n-lquote',
    'typograf-oa-sp-lquote'
];
const name = 'ru/optalign/quote';

export const quote = {
    name,
    handler(text) {
        const quote = this.getSetting('common/punctuation/quote', 'ru');
        const lquotes = '([' + quote.left[0] + (quote.left[1] || '') + '])';
        const reNewLine = new RegExp('(^|\n\n|' + privateLabel + ')(' + lquotes + ')', 'g');
        const reInside = new RegExp('([^\n' + privateLabel + '])([ \u00A0\n])(' + lquotes + ')', 'gi');

        return text
            .replace(reNewLine, '$1<span class="typograf-oa-n-lquote">$2</span>')
            .replace(reInside, '$1<span class="typograf-oa-sp-lquote">$2</span><span class="typograf-oa-lquote">$3</span>');
    },
    disabled: true,
    htmlAttrs: false
};

export const innerStartQuote = {
    name,
    queue: 'start',
    handler(text) {
        return removeOptAlignTags(text, classNames);
    }
};

export const innerEndQuote = {
    name,
    queue: 'end',
    handler(text) {
        return removeOptAlignTagsFromTitle(text, classNames);
    }
};
