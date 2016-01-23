Typograf.rule({
    name: 'ru/dash/main',
    index: '-5',
    handler: function(text) {
        var dashes = this.data('common/dash'),
            re = new RegExp('( |\u00A0)(' + dashes + ')( |\\n)', 'g');

        return text.replace(re, '\u00A0\u2014$3');
    }
});
