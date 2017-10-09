Typograf.addRule({
    name: 'common/html/stripTags',
    index: '+99',
    queue: 'end',
    handler(text) {
        return text.replace(/<[^>]+>/g, '');
    },
    disabled: true
});
