Typograf.rule({
    name: 'ru/dash/daysMonth',
    handler: function(text) {
        var re = new RegExp('(^|\\s)([123]?\\d)' +
                '(' + Typograf.data('common/dash') + ')' +
                '([123]?\\d)[ \u00A0]' +
                '(' + Typograf.data('ru/monthGenCase') + ')', 'g');

        return text.replace(re, '$1$2\u2014$4\u00A0$5');
    }
});
