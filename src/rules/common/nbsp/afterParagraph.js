Typograf.rule({
    name: 'common/nbsp/afterParagraph',
    handler: function(text) {
        // \u2009 - THIN SPACE
        // \u202F - NARROW NO-BREAK SPACE
        return text.replace(/\u00A7[ \u00A0\u2009]?(\d|I|V|X)/g, '\u00A7\u202F$1');
    }
});
