Typograf.addRule({
    name: 'common/nbsp/beforeShortLastNumber',
    handler: function(text, settings, context) {
        var ch = context.getData('char'),
            CH = ch.toUpperCase(),
            re = new RegExp('([' + ch + CH +
            ']) (?=\\d{1,' + settings.lengthLastNumber +
            '}[-+−%\'"' + context.getData('quote').right + ']?([.!?…]( [' +
            CH + ']|$)|$))', 'gm');

        return text.replace(re, '$1\u00A0');
    },
    live: false,
    settings: {
        lengthLastNumber: 2
    }
});
