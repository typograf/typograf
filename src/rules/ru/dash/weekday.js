Typograf.addRule({
    name: 'ru/dash/weekday',
    handler: function(text, settings) {
        var part = '(' + Typograf.getData('ru/weekday') + ')',
            re = new RegExp(part + ' ?(' + Typograf.getData('common/dash') + ') ?' + part, 'gi');

        return text.replace(re, '$1' + settings.dash + '$3');
    },
    settings: {
        dash: '\u2013' // &ndash;
    }
});
