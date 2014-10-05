Typograf.rule('space_after_short_word', 590, function(text) {
    var len = this.setting('lengthShortWord'),
        re = new RegExp('( [а-яА-Я\\w]{1,' + len + '}) ', 'g');
        
    return len > 0 ? text.replace(re, '$1\u00A0') : text;
});

Typograf.defaultSetting('lengthShortWord', 2);
