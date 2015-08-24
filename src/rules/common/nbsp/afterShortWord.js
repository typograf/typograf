Typograf.rule({
    name: 'common/nbsp/afterShortWord', 
    index: 590,
    handler: function(text, settings) {
        var len = settings.lengthShortWord,
            str = '(^| |\u00A0)([' +
                this.letters() +
                ']{1,' + len + '})(\\.?) ',
            re = new RegExp(str, 'gi');

        return text
            .replace(re, '$1$2$3\u00A0')
            .replace(re, '$1$2$3\u00A0');
    },
    settings: {
        lengthShortWord: 2
    }
});
