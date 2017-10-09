Typograf.addRule({
    name: 'common/html/processingAttrs',
    queue: 'hide-safe-tags-own', // After "hide-safe-tags-own", before "hide-safe-tags-html".
    handler(text, settings, context) {
        const that = this;
        const reAttrs = new RegExp('(^|\\s)(' + settings.attrs.join('|') + ')=("[^"]*?"|\'[^\']*?\')', 'gi');
        const prefs = Typograf.deepCopy(context.prefs);

        prefs.ruleFilter = function(rule) {
            return rule.htmlAttrs !== false;
        };

        return text.replace(/(<[-\w]+\s)([^>]+?)(?=>)/g, function(match, tagName, attrs) {
            const resultAttrs = attrs.replace(reAttrs, function(submatch, space, attrName, attrValue) {
                const lquote = attrValue[0];
                const rquote = attrValue[attrValue.length - 1];
                const value = attrValue.slice(1, -1);

                return space + attrName + '=' + lquote + that.execute(value, prefs) + rquote;
            });

            return tagName + resultAttrs;
        });
    },
    settings: {
        attrs: ['title', 'placeholder']
    },
    disabled: true,
    htmlAttrs: false
});
