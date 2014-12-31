Typograf.rule({
    title: 'Неразрывный пробел между числом и словом',
    name: 'ru/nbsp/afterNumber',
    sortIndex: 615,
    func: function(text) {
        var re = '(^|\\D)(\\d{1,5}) ([' +
            this._getLetter() +
            ']{2,})';

        return text.replace(new RegExp(re, 'gi'), '$1$2\u00A0$3');
    }
});
