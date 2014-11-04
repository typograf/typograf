Typograf.rule({
    title: '2 Мая, Понедельник → 2 мая, понедельник',
    name: 'ru/date/weekday',
    sortIndex: 1310,
    func: function(text) {
        var space = '( |\u00A0)',
            monthCase = this.data['ru/monthCase'].join('|'),
            weekday = this.data['ru/weekday'].join('|'),
            re = new RegExp('(\\d)' + space + '(' + monthCase + '),' + space + '(' + weekday + ')', 'gi');

        return text.replace(re, function() {
            var a = arguments;
            return a[1] + a[2] + a[3].toLowerCase() + ',' + a[4] + a[5].toLowerCase();
        });
    }
});
