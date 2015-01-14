Typograf.rule({
    name: 'common/nbsp/beforeShortLastWord',
    sortIndex: 620,
    func: function(text, settings) {
        var len = settings.lengthLastWord,
            re = new RegExp(' ([' + this.letters() + ']{1,' + len + '})(\\.|\\?|:|!|,)', 'gi');

        return text.replace(re, '\u00A0$1$2');
    },
    settings: {
        lengthLastWord: 3
    }
});
