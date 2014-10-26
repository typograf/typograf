Typograf.rule({
    title: 'Неразрывный пробел перед последним коротким словом в предложении',
    name: 'nbsp:before_short_last_word',
    sortIndex: 620,
    func: function(text) {
        var len = this.setting('lengthLastWord'),
            re = new RegExp(' ([а-яёА-ЯЁ\\w]{1,' + len + '})(\\.|\\?|:|!|,)', 'g');

        return len > 0 ? text.replace(re, '\u00A0$1$2') : text;
    }
});

Typograf.defaultSetting('lengthLastWord', 3);
