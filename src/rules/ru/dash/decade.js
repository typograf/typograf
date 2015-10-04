Typograf.rule({
    name: 'ru/dash/decade',
    handler: function(text) {
        var re = new RegExp('(^|\\s)(\\d{3}|\\d)0' +
                '(' + Typograf.data('common/dash') + ')' +
                '(\\d{3}|\\d)0(-е[ \u00A0])' +
                '(?=г\\.?[ \u00A0]?г|год)', 'g');

        return text.replace(re, '$1$20\u2014$40$5');
    }
});
