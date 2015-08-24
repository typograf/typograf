Typograf.rule({
    name: 'common/space/delLeadingBlanks',
    index: 504,
    handler: function(text) {
        return text.replace(/\n[ \t]+/g, '\n');
    },
    disabled: true
});
