Typograf.rule({
    name: 'ru/nbsp/cc',
    sortIndex: 1090,
    func: function(text) {
        text = text.replace(/(^|\d|V|I|X) ?в(в)?( |,|;|\n|$)/g, '$1\u00A0в$2.$3');

        return text.replace(/(^|\d|[IVX]) ?в\.? ?в\./g, '$1\u00A0вв.');
    }
});
