Typograf.rule({
    name: 'common/space/delLeadingBlanks',
    sortIndex: 504,
    func: function(text) {
        return text.replace(/\n[ \t]+/g, '\n');
    },
    disabled: true
});
