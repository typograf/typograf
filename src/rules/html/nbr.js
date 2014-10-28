Typograf.rule({
    title: 'Замена перевода строки на <br/>',
    name: 'html/nbr',
    sortIndex: 710,
    func: function(text) {
        return text.replace(/\n/g, '<br/>');
    },
    enabled: false
});
