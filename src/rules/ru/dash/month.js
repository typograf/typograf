Typograf.rule({
    name: 'ru/dash/month',
    handler: function(text, settings) {
        var months = '(' + this.data('ru/month') + ')',
            monthsPre = '(' + this.data('ru/monthPreCase') + ')',
            dashes = this.data('common/dash'),
            re = new RegExp(months + ' ?(' + dashes + ') ?' + months, 'gi'),
            rePre = new RegExp(monthsPre + ' ?(' + dashes + ') ?' + monthsPre, 'gi'),
            newSubStr = '$1' + settings.dash + '$3';

        return text
            .replace(re, newSubStr)
            .replace(rePre, newSubStr);
    },
    settings: {
        dash: '\u2013' // &ndash;
    }
});
