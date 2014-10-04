// Расстановка запятых перед а и но
Typograf.rule('but', 1110, function(text) {
    var re = new RegExp('([,])?( |\u00A0|\n)(а|но)( |\u00A0|\n)', 'g');
    return text.replace(re, ',$2$3$4');
});
