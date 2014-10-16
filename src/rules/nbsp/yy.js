Typograf.rule({
    title: 'г.г. → гг. и неразрывный пробел',
    name: 'nbsp:yy',
    sortIndex: 1080,
    func: function(text) {
        return text.replace(/(^| )г\. ?г\./g, '\u00A0гг.');
    }
});
