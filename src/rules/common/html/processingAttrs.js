Typograf.addRule({
    name: 'common/html/processingAttrs',
    queue: 'hide-safe-tags-own', // After "hide-safe-tags-own", before "hide-safe-tags-html".
    handler: function(text, settings, context) {
        var that = this,
            reAttrs = new RegExp('(^|\\s)(' + settings.attrs.join('|') + ')=("[^"]*?"|\'[^\']*?\')', 'gi'),
            prefs = Typograf.deepCopy(context.prefs);

        prefs.ruleFilter = function(rule) {
            return rule.htmlAttrs !== false;
        };

        return text.replace(/(<[-\w]+\s)([^>]+?)(?=>)/g, function(match, tagName, attrs) {
            var resultAttrs = attrs.replace(reAttrs, function(submatch, space, attrName, attrValue) {
                var lquote = attrValue[0],
                    rquote = attrValue[attrValue.length - 1],
                    value = attrValue.slice(1, -1);

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
