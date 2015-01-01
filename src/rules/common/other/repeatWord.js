Typograf.rule({
    title: 'Удаление повтора слова',
    name: 'common/other/repeatWord',
    sortIndex: 1200,
    func: function(text) {
        var re = '([' +
            this.letters() +
            '\u0301]+) \\1([;:,.?! \n])';

        return text.replace(new RegExp(re, 'gi'), '$1$2');
    },
    enabled: false
});
