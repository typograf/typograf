Typograf.rule({
    title: 'Нераз. пробел между числом и словом',
    name: 'ru/nbsp/afterNumber',
    sortIndex: 615,
    func: function(text) {
        var re = '(^|\\D)(\\d{1,5}) ([' +
            this.letters() +
            ']{2,})';

        return text.replace(new RegExp(re, 'gi'), '$1$2\u00A0$3');
    }
});
