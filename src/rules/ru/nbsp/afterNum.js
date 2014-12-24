Typograf.rule({
    title: 'Неразрывный пробел после №',
    name: 'ru/nbsp/afterNum',
    sortIndex: 610,
    func: function(text) {
        return text.replace(/№ ?(\d|п\/п)/g, '№\u00A0$1');
    }
});
