// вв.
Typograf.rule('cc', 1090, function(text) {
    return text.replace(/(^|\d|[IVX]) ?в\.? ?в\./g, '$1\u00A0вв.');
});
