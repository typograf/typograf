Typograf.rule({
    title: 'Удаление пробелов в конце строк',
    name: 'space/delTrailingBlanks',
    sortIndex: 505,
    func: function(text) {
        return text.replace(/( |\t)+\n/g, '\n');
    }
});
