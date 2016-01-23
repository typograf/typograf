Typograf.rule({
    name: 'ru/nbsp/dayMonth',
    handler: function(text) {
        var re = new RegExp('(\\d{1,2}) (' + this.data('ru/shortMonth') + ')', 'gi');
        return text.replace(re, '$1\u00A0$2');
    }
});
