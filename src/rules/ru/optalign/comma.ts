import { Rule } from '../../../types';

import { removeOptAlignTags, removeOptAlignTagsFromTitle} from './helpers';

const classNames = [
    'typograf-oa-comma',
    'typograf-oa-comma-sp'
];
const name = 'ru/optalign/comma';

export const comma: Rule = {
    name,
    handler(text, settings, context) {
        const re = new RegExp('([' + context.getCharData() + '\\d\u0301]+), ', 'gi');
        return text.replace(re, '$1<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>');
    },
    disabled: true,
    htmlAttrs: false
};

export const innerStartComma: Rule = {
    name,
    queue: 'start',
    handler(text) {
        return removeOptAlignTags(text, classNames);
    }
};

export const innerEndComma: Rule = {
    name,
    queue: 'end',
    handler(text) {
        return removeOptAlignTagsFromTitle(text, classNames);
    }
};
