Typograf.rule({
    title: 'Удаление пробелов и переносов строк в начале текста',
    name: 'common/space/trimLeft',
    sortIndex: 530,
    func: String.prototype.trimLeft ? function(text) {
        return text.trimLeft();
    } : function(text) {
        return text.replace(/^[\s\uFEFF\xA0]+/g, '');
    }
});
