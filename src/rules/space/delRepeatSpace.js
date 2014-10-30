Typograf.rule({
    title: 'Удаление повторяющихся пробелов',
    name: 'space/delRepeatSpace',
    sortIndex: 540,
    func: function(text) {
        return text.replace(/( |\t){2,}/g, '$1');
    }
});
