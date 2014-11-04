Typograf.rule({
    title: 'Неразрывный пробел перед последним коротким словом в предложении',
    name: 'nbsp/beforeShortLastWord',
    sortIndex: 620,
    func: function(text, settings) {
        var len = settings.lengthLastWord,
            re = new RegExp(' ([а-яёА-ЯЁ\\w]{1,' + len + '})(\\.|\\?|:|!|,)', 'g');

        return text.replace(re, '\u00A0$1$2');
    },
    settings: {
        lengthLastWord: 3
    }
});
