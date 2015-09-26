Typograf.rule({
    name: 'common/html/nbr',
    index: '+5',
    queue: 'end',
    handler: function(text) {
        return text.search(/<br/) === -1 ? text.replace(/\n/g, '<br/>\n') : text;
    },
    disabled: true
});
