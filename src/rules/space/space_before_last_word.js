Typograf.rule('space_before_last_word', 620, function(text) {
    var len = this.setting('lengthLastWord');
    if (len > 0) {
        var re = new RegExp("( )([а-яА-Я\\w]{1," + len + "})(\\.|\\?|:|\\!|,)", 'g');
        text = text.replace(re, "\u00A0$2$3");
    }

    return text;
});

Typograf.setting('lengthLastWord', 3);
