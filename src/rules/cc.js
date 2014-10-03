// вв.
Typograf.rule('cc', 1090, function(text) {
    return text.replace(/^в\. ?в\./g, 'вв.').replace(/ ?в\. ?в\./g, "\u00A0вв.");
});
