Typograf.addRule({
    name: 'common/html/quot',
    queue: 'hide-safe-tags',
    handler: function(text) {
        return text.replace(/&quot;/g, '"');
    }
});
