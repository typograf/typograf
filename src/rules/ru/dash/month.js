Typograf.addRule({
    name: 'ru/dash/month',
    handler: function(text, settings) {
        var months = '(' + this.getData('ru/month') + ')',
            monthsPre = '(' + this.getData('ru/monthPreCase') + ')',
            dashes = this.getData('common/dash'),
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
