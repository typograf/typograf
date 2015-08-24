Typograf.rule({
    name: 'common/other/repeatWord',
    index: 1200,
    handler: function(text) {
        var re = '([' +
            this.letters() +
            '\u0301]+) \\1([;:,.?! \n])';

        return text.replace(new RegExp(re, 'gi'), '$1$2');
    },
    disabled: true
});
