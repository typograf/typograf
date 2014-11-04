Typograf.rule({
    title: 'Замена табов на пробелы',
    name: 'common/space/replaceTab',
    sortIndex: 510,
    func: function(text) {
        return text.replace(/\t/g, ' ');
    }
});
