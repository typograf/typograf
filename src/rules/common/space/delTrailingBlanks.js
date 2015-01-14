Typograf.rule({
    name: 'common/space/delTrailingBlanks',
    sortIndex: 505,
    func: function(text) {
        return text.replace(/[ \t]+\n/g, '\n');
    }
});
