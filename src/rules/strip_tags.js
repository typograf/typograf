Typograf.rule({
    title: 'Удаление HTML-тегов',
    name: 'strip_tags',
    sortIndex: 5,
    func: function(text) {
        return text.replace(/<\/?[^>]+>/g, '');
    },
    enabled: false
});
