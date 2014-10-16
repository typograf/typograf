Typograf.rule({
    title: 'Неразрывный пробел перед последним коротким словом в предложении',
    name: 'nbsp:before_last_word', 
    sortIndex: 620,
    func: function(text) {
        var len = this.setting('lengthLastWord'),
            re = new RegExp('( )([а-яА-Я\\w]{1,' + len + '})(\\.|\\?|:|\\!|,)', 'g');

        return len > 0 ? text.replace(re, '\u00A0$2$3') : text;
    }
});

Typograf.defaultSetting('lengthLastWord', 3);
