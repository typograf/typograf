Typograf.rule('del_double_punctiation', 580, function(text) {
    return text.replace(/(,|\.|\:|\!|\?){2,}/g, '$1');
});
