Typograf.rule({
    name: 'ru/punctuation/ano',
    handler: function(text) {
        var re = new RegExp('([^!?,:;\\-‒–—])([ \u00A0\n])(а|но)(?= |\u00A0|\n)', 'g');
        return text.replace(re, '$1,$2$3');
    }
});
