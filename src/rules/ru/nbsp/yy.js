Typograf.rule({
    name: 'ru/nbsp/yy',
    index: 1080,
    handler: function(text) {
        return text.replace(/(^|\d) ?г\. ?г\./g, '$1\u00A0гг.');
    }
});
