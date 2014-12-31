Typograf.rule({
    title: 'Удаление повторяющихся пробелов между символов',
    name: 'common/space/delRepeatSpace',
    sortIndex: 540,
    func: function(text) {
        return text.replace(/([^\n \t])( |\t){2,}([^\n \t])/g, '$1$2$3');
    }
});
