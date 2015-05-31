Typograf.rule({
    name: 'common/html/nbr',
    sortIndex: 110,
    queue: 'start',
    func: function(text) {
        return text.search(/<br/) === -1 ? text.replace(/\n/g, '<br/>\n') : text;
    },
    disabled: true
});
