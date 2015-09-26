Typograf.rule({
    name: 'common/html/stripTags',
    index: '+99',
    queue: 'end',
    handler: function(text) {
        return text.replace(/<[^>]+>/g, '');
    },
    disabled: true
});
