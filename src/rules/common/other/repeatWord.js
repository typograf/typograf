Typograf.rule({
    name: 'common/other/repeatWord',
    handler: function(text) {
        var re = new RegExp('([' +
            this._data('l') +
            '\u0301]+) \\1([;:,.?! \n])', 'gi');

        return text.replace(re, '$1$2');
    },
    disabled: true
});
