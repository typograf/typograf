Typograf.rule({
    name: 'ru/nbsp/m',
    index: 1030,
    handler: function(text) {
        var m = '(км|м|дм|см|мм)',
            re2 = new RegExp('(^|\\D)(\\d+) ?' + m + '2(\\D|$)', 'g'),
            re3 = new RegExp('(^|\\D)(\\d+) ?' + m + '3(\\D|$)', 'g');

        return text
            .replace(re2, '$1$2\u00A0$3²$4')
            .replace(re3, '$1$2\u00A0$3³$4');
    }
});
