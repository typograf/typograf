import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/html/escape',
    index: '+100',
    queue: 'end',
    handler(text) {
        const entityMap: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#39;',
            '/': '&#x2F;'
        };

        return text.replace(/[&<>"'/]/g, entity => {
            return entityMap[entity];
        });
    },
    disabled: true
};

export default rule;
