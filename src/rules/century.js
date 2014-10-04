// Века
Typograf.rule('century', 1070, function(text) {
    return text.replace(/(\d+) ?в( |,|;|\.|\n|$)/g, '$1\u00A0в$2')
        .replace(/(V|I|X) ?в(в)?( |,|;|\.|\n|$)/g, '$1\u00A0в$2$3');
});
