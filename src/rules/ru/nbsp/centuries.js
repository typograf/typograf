Typograf.addRule({
    name: 'ru/nbsp/centuries',
    handler: function(text) {
        var dashes = Typograf.getData('common/dash'),
            before = '(^|\\s)([VIX]+)',
            after = '(?=[,;:?!"‘“»]|$)',
            re1 = new RegExp(before + '[ \u00A0]?в\\.?' + after, 'gm'),
            re2 = new RegExp(before + '(' + dashes + ')' + '([VIX]+)[ \u00A0]?в\\.?([ \u00A0]?в\\.?)?' + after, 'gm');

        return text
            .replace(re1, '$1$2\u00A0в.')
            .replace(re2, '$1$2$3$4\u00A0вв.');
    }
});
