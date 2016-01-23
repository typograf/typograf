Typograf.rule({
    name: 'common/nbsp/beforeShortLastNumber',
    handler: function(text, settings) {
        var re = new RegExp('([' + this.data('lL') +
            ']) (?=\\d{1,' + settings.lengthLastNumber +
            '}[-+−%\'"' + this.data('rquote') + ']?([.!?…]( [' +
            this.data('L') + ']|$)|$))', 'gm');

        return text.replace(re, '$1\u00A0');
    },
    live: false,
    settings: {
        lengthLastNumber: 2
    }
});
