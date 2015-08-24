Typograf.rule({
    name: 'ru/money/dollar',
    index: 1140,
    handler: function(text) {
        var re1 = new RegExp('(^|[\\D]{2,})\\$ ?([\\d.,]+)', 'g'),
            re2 = new RegExp('(^|[\\D])([\\d.,]+) ?\\$', 'g'),
            rep = '$1$2\u00A0$';

        return text
            .replace(re1, rep)
            .replace(re2, rep);
    }
});
