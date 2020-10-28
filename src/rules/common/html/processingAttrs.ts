import { deepCopy } from '../../../helpers/object';
import { Rule } from '../../../types';

const rule: Rule<{ attrs: string[] }> = {
    name: 'common/html/processingAttrs',
    queue: 'hide-safe-tags-own', // After "hide-safe-tags-own", before "hide-safe-tags-html".
    handler(text, settings, context) {
        const reAttrs = new RegExp('(^|\\s)(' + settings.attrs.join('|') + ')=("[^"]*?"|\'[^\']*?\')', 'gi');
        const options = deepCopy(context.options);

        options.ruleFilter = rule => {
            return rule.htmlAttrs !== false;
        };

        return text.replace(/(<[-\w]+\s)([^>]+?)(?=>)/g, (match, tagName: string, attrs: string) => {
            const resultAttrs = attrs.replace(reAttrs, (submatch, space: string, attrName: string, attrValue: string) => {
                const lquote = attrValue[0];
                const rquote = attrValue[attrValue.length - 1];
                const value = attrValue.slice(1, -1);

                return space + attrName + '=' + lquote + this.execute(value, options) + rquote;
            });

            return tagName + resultAttrs;
        });
    },
    settings: {
        attrs: ['title', 'placeholder']
    },
    disabled: true,
    htmlAttrs: false
};

export default rule;
