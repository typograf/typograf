Typograf.rule({
    name: 'common/space/bracket',
    index: 560,
    handler: function(text) {
        return text
            .replace(/(\() +/g, '(')
            .replace(/ +\)/g, ')');
    }
});
