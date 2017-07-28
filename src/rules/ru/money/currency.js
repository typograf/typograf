Typograf.addRule({
    name: 'ru/money/currency',
    handler: function(text) {
        var currency = '([$€¥Ұ£₤₽])',
            space = '[ \u00A0\u2009\u202F]',
            re1 = new RegExp('(^|[\\D]{2})' + currency + ' ?([\\d.,]+(' + space + '\\d{3})*)(' + space + '?(тыс\\.|млн|млрд|трлн))?', 'gm'),
            re2 = new RegExp('(^|[\\D])([\\d.,]+) ?' + currency, 'gm');

        return text
            .replace(re1, function($0, $1, $2, $3, $4, $5, $6) {
                return $1 + $3 + ($6 ? '\u00A0' + $6 : '') + '\u00A0' + $2;
            })
            .replace(re2, '$1$2\u00A0$3');
    }
});
