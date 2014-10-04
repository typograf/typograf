// гг.
Typograf.rule('yy', 1080, function(text) {
    return text.replace(/^г\. ?г\./g, 'гг.').replace(/ ?г\. ?г\./g, '\u00A0гг.');
});
