Typograf.rule({
    name: 'ru/dash/kade',
    index: 31,
    handler: function(text) {
        var re = new RegExp('([a-яё]+)( | ?- ?)(ка|де|кась)' + Typograf.data('ru/dash').after, 'g');
        return text.replace(re, '$1-$3$4');
    }
});
