Typograf.rule({
    name: 'common/nbsp/doi',
    handler: function(text) {
        var re = new RegExp('(^|[\\s([' + Typograf._privateLabel + '])DOI (?=\\d)', 'g');
        return text.replace(re, '$1DOI\u00A0');
    }
});
