Typograf.addRule({
    name: 'ru/dash/month',
    handler: function(text, settings) {
        var months = '(' + Typograf.getData('ru/month') + ')',
            monthsPre = '(' + Typograf.getData('ru/monthPreCase') + ')',
            dashes = Typograf.getData('common/dash'),
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
