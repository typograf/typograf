import type { TypografRule } from '../../../main';
import { privateLabel } from '../../../consts';
import { removeOptAlignTags, removeOptAlignTagsFromTitle } from './helpers';
import { DataQuote } from '../../../data';

const classNames = [
    'typograf-oa-lquote',
    'typograf-oa-n-lquote',
    'typograf-oa-sp-lquote'
];
const name = 'ru/optalign/quote';

export const quoteRule: TypografRule = {
    name,
    handler(text) {
        const quote = this.getSetting('common/punctuation/quote', 'ru') as DataQuote;
        const lquotes = '([' + quote.left[0] + (quote.left[1] || '') + '])';
        const reNewLine = new RegExp('(^|\n\n|' + privateLabel + ')(' + lquotes + ')', 'g');
        const reInside = new RegExp('([^\n' + privateLabel + '])([ \u00A0\n])(' + lquotes + ')', 'gi');

        return text
            .replace(reNewLine, '$1<span class="typograf-oa-n-lquote">$2</span>')
            .replace(reInside, '$1<span class="typograf-oa-sp-lquote">$2</span><span class="typograf-oa-lquote">$3</span>');
    },
    disabled: true,
    htmlAttrs: false,
};

export const innerStartQuoteRule: TypografRule = {
    name,
    queue: 'start',
    handler(text) {
        return removeOptAlignTags(text, classNames);
    },
    htmlAttrs: false,
};

export const innerEndQuoteRule: TypografRule = {
    name,
    queue: 'end',
    handler(text) {
        return removeOptAlignTagsFromTitle(text, classNames);
    },
    htmlAttrs: false,
};
