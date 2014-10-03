Typograf.rule('space_before_particle', 570, function(text) {
    return text.replace(/ (ли|ль|же|ж|бы|б)([^а-яА-Я])/g, "\u00A0$1$2");
});
