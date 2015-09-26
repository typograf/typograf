Typograf.rule({
    name: 'ru/dash/month',
    handler: function(text) {
        var months = '(' + Typograf.data('ru/month') + ')',
            monthsPre = '(' + Typograf.data('ru/monthPreCase') + ')',
            dashes = Typograf.data('common/dash'),
            re = new RegExp(months + ' ?(' + dashes + ') ?' + months, 'gi'),
            rePre = new RegExp(monthsPre + ' ?(' + dashes + ') ?' + monthsPre, 'gi');

        return text
            .replace(re, '$1\u2014$3')
            .replace(rePre, '$1\u2014$3');
    }
});
