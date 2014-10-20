Typograf.rule({
    title: 'Удаление двойной пунктуации',
    name: 'del_double_punctiation',
    sortIndex: 580,
    func: function(text) {
        return text.replace(/(,|:|;|\?){2,}/g, '$1');
    }
});
