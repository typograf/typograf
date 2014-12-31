Typograf.rule({
    title: 'Удаление пробелов в начале строки',
    name: 'common/space/delLeadingBlanks',
    sortIndex: 504,
    func: function(text) {
        return text.replace(/\n[ \t]+/g, '\n');
    },
    enabled: false
});
