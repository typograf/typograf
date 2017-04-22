Typograf.addRule({
    name: 'ru/dash/main',
    index: '-5',
    handler: function(text) {
        var dashes = Typograf.getData('common/dash'),
            re = new RegExp('([ \u00A0])(' + dashes + ')([ \u00A0\\n])', 'g');

        return text.replace(re, '\u00A0\u2014$3');
    }
});
