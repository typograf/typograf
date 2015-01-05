Typograf.rule({
    title: 'Нераз. пробел после короткого слова',
    name: 'common/nbsp/afterShortWord', 
    sortIndex: 590,
    func: function(text, settings) {
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
