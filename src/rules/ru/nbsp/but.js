Typograf.rule({
    title: 'Расстановка запятых и неразрывного пробела перед а и но',
    name: 'ru/nbsp/but',
    sortIndex: 1110,
    func: function(text) {
        var re = new RegExp('([,])?( |\u00A0|\n)(а|но)( |\u00A0|\n)', 'g');
        return text.replace(re, ',$2$3$4');
    }
});
