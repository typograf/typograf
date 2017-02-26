Typograf.addRule({
    name: 'ru/dash/weekday',
    handler: function(text, settings) {
        var part = '(' + this.getData('ru/weekday') + ')',
            re = new RegExp(part + ' ?(' + this.getData('common/dash') + ') ?' + part, 'gi');

        return text.replace(re, '$1' + settings.dash + '$3');
    },
    settings: {
        dash: '\u2013' // &ndash;
    }
});
