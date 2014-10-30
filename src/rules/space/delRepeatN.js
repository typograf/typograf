Typograf.rule({
    title: 'Удаление повторяющихся переносов строки (не более двух)',
    name: 'space/delRepeatN',
    sortIndex: 545,
    func: function(text) {
        return text.replace(/\n{3,}/g, '\n\n');
    }
});
