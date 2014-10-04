Typograf.rule('space_after_num', 610, function(text) {
    return text.replace(/№(\d)/g, '№\u00A0$1').replace(/§(\d|I|V|X)/g, '§\u00A0$1');
});
