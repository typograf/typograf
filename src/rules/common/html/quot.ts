import type { TypografRule } from '../../../main';
export const quotRule: TypografRule = {
    name: 'common/html/quot',
    queue: 'hide-safe-tags',
    handler(text) {
        return text.replace(/&quot;/g, '"');
    },
};
