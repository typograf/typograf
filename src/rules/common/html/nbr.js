Typograf.rule({
    name: 'common/html/nbr',
    index: 110,
    queue: 'start',
    handler: function(text) {
        return text.search(/<br/) === -1 ? text.replace(/\n/g, '<br/>\n') : text;
    },
    disabled: true
});
