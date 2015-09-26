Typograf.rule({
    name: 'common/space/delLeadingBlanks',
    handler: function(text) {
        return text.replace(/\n[ \t]+/g, '\n');
    },
    disabled: true
});
