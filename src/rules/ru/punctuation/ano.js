Typograf.rule({
    name: 'ru/punctuation/ano',
    index: 1110,
    handler: function(text) {
        var re = new RegExp('([^!?,:;\\-‒–—])([ \u00A0\n])(а|но)(?= |\u00A0|\n)', 'g');
        return text.replace(re, '$1,$2$3');
    }
});
