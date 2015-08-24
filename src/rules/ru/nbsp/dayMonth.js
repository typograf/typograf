Typograf.rule({
    name: 'ru/nbsp/dayMonth',
    index: 1105,
    handler: function(text) {
        var re = new RegExp('(\\d{1,2}) (' + Typograf.data('ru/shortMonth').join('|') + ')', 'gi');
        return text.replace(re, '$1\u00A0$2');
    }
});
