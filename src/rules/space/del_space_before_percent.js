Typograf.rule('del_space_before_percent', 600, function(text) {
    return text.replace(/ %/g, '%');
});
