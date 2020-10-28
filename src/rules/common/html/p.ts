import { Rule } from '../../../types';
import blockElements from '../../../htmlTags/block';

const rule: Rule = {
    name: 'common/html/p',
    index: '+5',
    queue: 'end',
    handler(text) {
        const blockRe = new RegExp('<(' + blockElements.join('|') + ')[>\\s]');
        const separator = '\n\n';
        const buffer = text.split(separator);

        buffer.forEach((text, i, data) => {
            if (!text.trim()) { return; }

            if (!blockRe.test(text)) {
                data[i] = text.replace(/^(\s*)/, '$1<p>').replace(/(\s*)$/, '</p>$1');
            }
        });

        return buffer.join(separator);
    },
    disabled: true,
    htmlAttrs: false
};

export default rule;
