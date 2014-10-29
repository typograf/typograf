Typograf.rule({
    title: '$100 → 100 $',
    name: 'ru/money/dollar',
    sortIndex: 1140,
    func: function(text) {
        var re1 = new RegExp('(^|[\\D]{2,})\\$ ?([\\d.,]+)', 'g'),
            re2 = new RegExp('(^|[\\D])([\\d.,]+) ?\\$'),
            rep = '$1$2\u00A0$';

        return text
            .replace(re1, rep)
            .replace(re2, rep);
    }
});
