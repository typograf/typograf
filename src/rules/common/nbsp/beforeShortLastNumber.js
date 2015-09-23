Typograf.rule({
    name: 'common/nbsp/beforeShortLastNumber',
    handler: function(text, settings) {
        var re = new RegExp('([' + this._data('lL') +
            ']) (?=\\d{1,' + settings.lengthLastNumber +
            '}[-+−%\'"' + this._data('rquote') + ']?([.!?…]( [' +
            this._data('L') + ']|$)|$))', 'gm');

        return text.replace(re, '$1\u00A0');
    },
    settings: {
        lengthLastNumber: 2
    }
});
