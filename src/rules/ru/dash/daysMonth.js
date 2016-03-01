Typograf.rule({
    name: 'ru/dash/daysMonth',
    handler: function(text, settings) {
        var re = new RegExp('(^|\\s)([123]?\\d)' +
                '(' + this.data('common/dash') + ')' +
                '([123]?\\d)[ \u00A0]' +
                '(' + this.data('ru/monthGenCase') + ')', 'g');

        return text.replace(re, '$1$2' + settings.dash + '$4\u00A0$5');
    },
    settings: {
        dash: '\u2013' // &ndash;
    }
});
