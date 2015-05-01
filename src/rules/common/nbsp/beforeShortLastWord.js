Typograf.rule({
    name: 'common/nbsp/beforeShortLastWord',
    sortIndex: 620,
    func: function(text, settings) {
        var len = settings.lengthLastWord,
            punc = '.,?!:;',
            re = new RegExp('([^' + punc + ']) ([' +
                this.letters() + ']{1,' + len + '}[' + punc + '])', 'gi');

        return text.replace(re, '$1\u00A0$2');
    },
    settings: {
        lengthLastWord: 3
    }
});
