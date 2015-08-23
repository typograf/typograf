Typograf.rule({
    name: 'common/html/escape',
    index: 110,
    queue: 'end',
    handler: function(text) {
        var entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#39;',
            '/': '&#x2F;'
        };

        return text.replace(/[&<>"'\/]/g, function(s) {
            return entityMap[s];
        });
    },
    disabled: true
});
