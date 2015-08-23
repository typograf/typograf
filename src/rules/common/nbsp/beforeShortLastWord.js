Typograf.rule({
    name: 'common/nbsp/beforeShortLastWord',
    index: 620,
    handler: function(text, settings) {
        var punc = '.,?!:;',
            re = new RegExp('([^' + punc + ']) ([' +
                this.letters() + ']{1,' + settings.lengthLastWord + '}[' + punc + '])', 'gi');

        return text.replace(re, '$1\u00A0$2');
    },
    settings: {
        lengthLastWord: 3
    }
});
