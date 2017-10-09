Typograf.addRule({
    name: 'common/space/delLeadingBlanks',
    handler(text) {
        return text.replace(/\n[ \t]+/g, '\n');
    },
    disabled: true
});
