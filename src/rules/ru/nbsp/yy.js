Typograf.rule({
    name: 'ru/nbsp/yy',
    sortIndex: 1080,
    func: function(text) {
        return text.replace(/(^|\d) ?г\. ?г\./g, '$1\u00A0гг.');
    }
});
