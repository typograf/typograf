import { DataChar } from '../../../data';
import type { TypografRule } from '../../../main';
import { removeOptAlignTags, removeOptAlignTagsFromTitle} from './helpers';

const classNames = [
    'typograf-oa-comma',
    'typograf-oa-comma-sp',
];
const name = 'ru/optalign/comma';

export const commaRule: TypografRule = {
    name,
    handler(text, _settings, context) {
        const char = context.getData('char') as DataChar;
        const re = new RegExp('([' + char + '\\d\u0301]+), ', 'gi');
        return text.replace(re, '$1<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>');
    },
    disabled: true,
    htmlAttrs: false,
};

export const innerStartCommaRule: TypografRule = {
    name,
    queue: 'start',
    handler(text) {
        return removeOptAlignTags(text, classNames);
    },
    htmlAttrs: false,
};

export const innerEndCommaRule: TypografRule = {
    name,
    queue: 'end',
    handler(text) {
        return removeOptAlignTagsFromTitle(text, classNames);
    },
    htmlAttrs: false,
};
