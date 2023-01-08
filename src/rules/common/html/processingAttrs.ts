import type { TypografRule } from '../../../main';
import { deepCopy } from '../../../helpers/object';

export const processingAttrsRule: TypografRule<{ attrs: string[]; }> = {
    name: 'common/html/processingAttrs',
    queue: 'hide-safe-tags-own', // After "hide-safe-tags-own", before "hide-safe-tags-html".
    handler(text, settings, context) {
        const reAttrs = new RegExp('(^|\\s)(' + settings.attrs.join('|') + ')=("[^"]*?"|\'[^\']*?\')', 'gi');
        const prefs = deepCopy(context.prefs);

        prefs.ruleFilter = rule => rule.htmlAttrs !== false;

        return text.replace(/(<[-\w]+\s)([^>]+?)(?=>)/g, (_match, tagName: string, attrs: string) => {
            const resultAttrs = attrs.replace(reAttrs, (_submatch, space, attrName, attrValue) => {
                const lquote = attrValue[0];
                const rquote = attrValue[attrValue.length - 1];
                const value = attrValue.slice(1, -1);

                return space + attrName + '=' + lquote + this.execute(value, prefs) + rquote;
            });

            return tagName + resultAttrs;
        });
    },
    settings: {
        attrs: ['title', 'placeholder']
    },
    disabled: true,
    htmlAttrs: false,
};
