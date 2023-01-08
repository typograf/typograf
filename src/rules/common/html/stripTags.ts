import type { TypografRule } from '../../../main';
export const stripTagsRule: TypografRule = {
    name: 'common/html/stripTags',
    index: '+99',
    queue: 'end',
    handler(text) {
        return text.replace(/<[^>]+>/g, '');
    },
    disabled: true,
};
