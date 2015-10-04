Typograf.rule({
    name: 'common/nbsp/dpi',
    handler: function(text) {
        return text.replace(/(\d) ?(lpi|dpi)(?!\w)/, '$1\u00A0$2');
    }
});
