import type { TypografRule } from '../../../main';
const entityMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '/': '&#x2F;'
};

export const escapeRule: TypografRule = {
    name: 'common/html/escape',
    index: '+100',
    queue: 'end',
    handler(text) {
        return text.replace(/[&<>"'/]/g, key => entityMap[key]);
    },
    disabled: true,
};
