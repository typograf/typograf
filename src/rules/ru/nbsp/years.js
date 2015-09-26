Typograf.rule({
    name: 'ru/nbsp/years',
    index: '+5',
    handler: function(text) {
        var dashes = Typograf.data('common/dash'),
            re = new RegExp('(^|\\D)(\\d{4})(' +
                dashes + ')(\\d{4})[ \u00A0]?г\\.?([ \u00A0]?г\\.)?', 'g');

        return text.replace(re, '$1$2$3$4\u00A0гг.');
    }
});
