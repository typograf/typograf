Typograf.rule({
    name: 'ru/dash/month',
    index: 610,
    handler: function(text) {
        var months = '(' + Typograf.data('ru/month').join('|') + ')',
            monthsPre = '(' + Typograf.data('ru/monthPreCase').join('|') + ')',
            dashes = Typograf.data('common/dash'),
            dashInterval = this.setting('ru/dash/main', 'dashInterval'),
            re = new RegExp(months + ' ?(' + dashes + ') ?' + months, 'gi'),
            rePre = new RegExp(monthsPre + ' ?(' + dashes + ') ?' + monthsPre, 'gi');

        return text
            .replace(re, '$1' + dashInterval + '$3')
            .replace(rePre, '$1' + dashInterval + '$3');
    }
});
