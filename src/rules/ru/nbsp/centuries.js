Typograf.rule({
    name: 'ru/nbsp/centuries',
    handler: function(text) {
        var dashes = this.data('common/dash'),
            re1 = new RegExp('(^|\\s)([VIX]+)[ \u00A0]?в\\.?(?=[^.]|$)', 'g'),
            re2 = new RegExp('(^|\\s)([VIX]+)(' + dashes + ')([VIX]+)[ \u00A0]?в\\.?([ \u00A0]?в\\.?)?(?=[^.]|$)', 'g');

        return text
            .replace(re1, '$1$2\u00A0в.')
            .replace(re2, '$1$2$3$4\u00A0вв.');
    }
});
