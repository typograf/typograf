// Кв. км м дм см мм
Typograf.rule('m2', 1030, function(text) {
    var m = '(км|м|дм|см|мм)',
        re = new RegExp("(^|\\D)(\\d+) ?" + m + "2(\\D|$)", 'g');

    return text.replace(re, "$1$2\u00A0$3²$4");
});
