Typograf.rule({
    title: 'Замена перевода строки на тег br',
    name: 'common/html/nbr',
    sortIndex: 2010,
    func: function(text) {
        return text.replace(/\n/g, '<br/>');
    },
    enabled: false
});
