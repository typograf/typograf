Typograf.rule({
    name: 'common/html/nbr',
    sortIndex: 2020,
    func: function(text) {
        return text.search(/<br/) === -1 ? text.replace(/\n/g, '<br/>\n') : text;
    },
    disabled: true
});
