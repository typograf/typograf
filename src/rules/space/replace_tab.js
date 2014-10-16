Typograf.rule({
    title: 'Замена табов на пробелы',
    name: 'space:replace_tab',
    sortIndex: 510,
    func: function(text) {
        return text.replace(/\t/g, ' ');
    }
});
