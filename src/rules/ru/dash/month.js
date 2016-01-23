Typograf.rule({
    name: 'ru/dash/month',
    handler: function(text) {
        var months = '(' + this.data('ru/month') + ')',
            monthsPre = '(' + this.data('ru/monthPreCase') + ')',
            dashes = this.data('common/dash'),
            re = new RegExp(months + ' ?(' + dashes + ') ?' + months, 'gi'),
            rePre = new RegExp(monthsPre + ' ?(' + dashes + ') ?' + monthsPre, 'gi');

        return text
            .replace(re, '$1\u2014$3')
            .replace(rePre, '$1\u2014$3');
    }
});
