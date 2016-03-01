Typograf.rule({
    name: 'ru/dash/weekday',
    handler: function(text, settings) {
        var part = '(' + this.data('ru/weekday') + ')',
            re = new RegExp(part + ' ?(' + this.data('common/dash') + ') ?' + part, 'gi');

        return text.replace(re, '$1' + settings.dash + '$3');
    },
    settings: {
        dash: '\u2013' // &ndash;
    }
});
