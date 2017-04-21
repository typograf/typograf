Typograf.addRule({
    name: 'common/html/processingAttrs',
    queue: 'hide-safe-tags-own', // After "hide-safe-tags-own", before "hide-safe-tags-html".
    handler: function(text, settings) {
        var that = this,
            tp = null,
            reAttrs = new RegExp('(^|\\s)(' + settings.attrs.join('|') + ')=("[^"]*?"|\'[^\']*?\')', 'gi');

        return text.replace(/(<[-\w]+\s)([^>]+?)>/g, function(match, tagName, attrs) {
            var resultAttrs = attrs.replace(reAttrs, function(submatch, space, attrName, attrValue) {
                tp = tp || that._cloneInstance(function(rule) {
                    return rule.htmlAttrs !== false;
                });

                var lquote = attrValue[0],
                    rquote = attrValue[attrValue.length - 1],
                    value = attrValue.slice(1, -1);

                return space + attrName + '=' + lquote + tp.execute(value) + rquote;
            });

            return tagName + resultAttrs + '>';
        });
    },
    settings: {
        attrs: ['title', 'placeholder']
    },
    disabled: true,
    htmlAttrs: false
});
