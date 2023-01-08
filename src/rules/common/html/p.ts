import type { TypografRule } from '../../../main';
import { blockElements } from '../../../htmlTags/block';

const blockRe = new RegExp('<(' + blockElements.join('|') + ')[>\\s]');
const separator = '\n\n';

export const pRule: TypografRule = {
    name: 'common/html/p',
    index: '+5',
    queue: 'end',
    handler(text) {
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
    htmlAttrs: false,
};
