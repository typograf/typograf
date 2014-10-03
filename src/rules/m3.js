// Куб. км м дм см мм
Typograf.rule('m3', 1040, function(text) {
    var m = '(км|м|дм|см|мм)',
        re = new RegExp("(^|\\D)(\\d+) ?" + m + "3(\\D|$)", 'g');
        
    return text.replace(re, "$1$2\u00A0$3³$4");
});
