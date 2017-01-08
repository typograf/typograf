Typograf.addRule({
    name: 'ru/money/ruble',
    handler: function(text) {
        var newSubstr = '$1\u00A0₽',
            commonPart = '(\\d+)( |\u00A0)?(р|руб)\\.',
            re1 = new RegExp('^' + commonPart + '$', 'g'),
            re2 = new RegExp(commonPart + '(?=[!?,:;])', 'g'),
            re3 = new RegExp(commonPart + '(?=\\s+[A-ЯЁ])', 'g');
            
        return text
            .replace(re1, newSubstr)
            .replace(re2, newSubstr)
            .replace(re3, newSubstr + '.');
    },
    disabled: true
});
