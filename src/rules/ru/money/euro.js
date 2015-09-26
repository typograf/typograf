Typograf.rule({
    name: 'ru/money/euro',
    handler: function(text) {
        var re1 = new RegExp('(^|[\\D]{2,})€ ?([\\d.,]+([ \u00A0\u2009\u202F]\\d{3})*)', 'g'),
            re2 = new RegExp('(^|[\\D])([\\d.,]+) ?€', 'g'),
            rep = '$1$2\u00A0€';

        return text
            .replace(re1, rep)
            .replace(re2, rep);
    }
});
