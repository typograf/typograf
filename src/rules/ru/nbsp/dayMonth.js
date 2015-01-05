Typograf.rule({
    title: 'Нераз. пробел между числом и месяцем',
    name: 'ru/nbsp/dayMonth',
    sortIndex: 1105,
    func: function(text) {
        var re = new RegExp('(\\d{1,2}) (' + this.data['ru/shortMonth'].join('|') + ')', 'gi');
        return text.replace(re, '$1\u00A0$2');
    }
});
