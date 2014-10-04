Typograf.rule('del_repeat_space', 540, function(text) {
    return text.replace(/ {2,}/g, ' ').replace(/\n {1,}/g, '\n').replace(/\n{3,}/g, '\n\n');
});
