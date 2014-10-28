Typograf.rule({
    title: 'Удаление повторяющихся пробелов',
    name: 'space/delRepeatSpace',
    sortIndex: 540,
    func: function(text) {
        return text.replace(/ {2,}/g, ' ').replace(/\n {1,}/g, '\n').replace(/\n{3,}/g, '\n\n');
    }
});
