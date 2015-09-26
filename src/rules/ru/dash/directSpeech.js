Typograf.rule({
    name: 'ru/dash/directSpeech',
    handler: function(text) {
        var dashes = Typograf.data('common/dash'),
            re1 = new RegExp('(["»‘“,.…?!])[ |\u00A0]?(' + dashes + ')[ |\u00A0]', 'g'),
            re2 = new RegExp('(^|' + Typograf._privateLabel + ')(' + dashes + ')( |\u00A0)', 'gm');

        return text
            .replace(re1, '$1 \u2014\u00A0')
            .replace(re2, '$1\u2014\u00A0');
    }
});
