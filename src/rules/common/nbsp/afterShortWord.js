Typograf.rule({
    title: 'Неразрывный пробел после короткого слова',
    name: 'common/nbsp/afterShortWord', 
    sortIndex: 590,
    func: function(text, settings) {
        var len = settings.lengthShortWord,
            re = new RegExp('(^| |\u00A0)([a-zа-яё]{1,' + len + '})(\\.?) ', 'gi');

        return text
            .replace(re, '$1$2$3\u00A0')
            .replace(re, '$1$2$3\u00A0');
    },
    settings: {
        lengthShortWord: 2
    }
});
