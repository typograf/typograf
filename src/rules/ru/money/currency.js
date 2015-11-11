Typograf.rule({
    name: 'ru/money/currency',
    handler: function(text) {
        var currency = '([$€¥Ұ£₤₽])',
            re1 = new RegExp('(^|[\\D]{2,})' + currency + ' ?([\\d.,]+([ \u00A0\u2009\u202F]\\d{3})*)', 'g'),
            re2 = new RegExp('(^|[\\D])([\\d.,]+) ?' + currency, 'g'),
            newSubstr1 = '$1$3\u00A0$2',
            newSubstr2 = '$1$2\u00A0$3';

        return text
            .replace(re1, newSubstr1)
            .replace(re2, newSubstr2);
    }
});
