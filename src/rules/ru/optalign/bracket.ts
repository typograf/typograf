import { Rule } from '../../../types';
import { removeOptAlignTagsFromTitle, removeOptAlignTags } from './helpers';

const classNames = [
    'typograf-oa-lbracket',
    'typograf-oa-n-lbracket',
    'typograf-oa-sp-lbracket'
];
const name = 'ru/optalign/bracket';

export const bracket: Rule = {
    name,
    handler(text) {
        return text
            .replace(/( |\u00A0)\(/g, '<span class="typograf-oa-sp-lbracket">$1</span><span class="typograf-oa-lbracket">(</span>')
            .replace(/^\(/gm, '<span class="typograf-oa-n-lbracket">(</span>');
    },
    disabled: true,
    htmlAttrs: false
};

export const innerStartBracket: Rule = {
    name,
    queue: 'start',
    handler(text) {
        return removeOptAlignTags(text, classNames);
    }
};

export const innerEndBracket: Rule = {
    name,
    queue: 'end',
    handler(text) {
        return removeOptAlignTagsFromTitle(text, classNames);
    }
};
