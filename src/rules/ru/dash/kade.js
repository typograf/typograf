Typograf.rule({
    name: 'ru/dash/kade',
    sortIndex: 31,
    func: function(text) {
        var re = new RegExp('([a-яё]+)( | ?- ?)(ка|де|кась)' + Typograf.data('ru/dash').after, 'g');
        return text.replace(re, '$1-$3$4');
    }
});
