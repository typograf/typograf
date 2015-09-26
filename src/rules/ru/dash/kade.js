Typograf.rule({
    name: 'ru/dash/kade',
    handler: function(text) {
        var re = new RegExp('([a-яё]+)( | ?- ?)(ка|де|кась)' + Typograf.data('ru/dashAfter'), 'g');

        return text.replace(re, '$1-$3$4');
    }
});
