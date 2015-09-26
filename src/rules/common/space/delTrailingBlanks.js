Typograf.rule({
    name: 'common/space/delTrailingBlanks',
    index: '-3',
    handler: function(text) {
        return text.replace(/[ \t]+\n/g, '\n');
    }
});
