Typograf.rule({
    title: 'Неразрывный пробел после короткого слова',
    name: 'nbsp:after_short_word', 
    sortIndex: 590,
    func: function(text) {
        var len = this.setting('lengthShortWord'),
        re = new RegExp('( [а-яёА-ЯЁ\\w]{1,' + len + '}) ', 'g');

        return len > 0 ? text.replace(re, '$1\u00A0') : text;
    }
});

Typograf.defaultSetting('lengthShortWord', 2);
