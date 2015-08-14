Typograf.rule({
    name: 'ru/nbsp/twoPartAbbr',
    sortIndex: 565,
    func: function(text) {
        return text.replace(
            /(^| |\u00A0)([а-яё]{1,3}\.)((?!рф|рус|ру(?!б)|орг|бг|укр|срб)[а-яё]{1,3}\.)(?![а-яё])/g,
            '$1$2\u00A0$3'
        );
    }
});
