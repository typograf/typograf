Typograf.addRule({
    name: 'common/space/delLeadingBlanks',
    handler(text) {
        return text.replace(/^[ \t]+/mg, '');
    },
    disabled: true
});
