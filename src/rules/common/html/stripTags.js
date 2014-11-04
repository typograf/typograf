Typograf.rule({
    title: 'Удаление HTML-тегов',
    name: 'common/html/stripTags',
    sortIndex: 5,
    func: function(text) {
        return text.replace(/<\/?[^>]+>/g, '');
    },
    enabled: false
});
