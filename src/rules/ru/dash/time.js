Typograf.addRule({
    name: 'ru/dash/time',
    handler: function(text, settings) {
        var re = new RegExp(this.getData('ru/dashBefore') +
            '(\\d?\\d:[0-5]\\d)' +
            this.getData('common/dash') +
            '(\\d?\\d:[0-5]\\d)' +
            this.getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2' + settings.dash + '$3');
    },
    settings: {
        dash: '\u2013' // &ndash;
    }
});
