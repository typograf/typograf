Typograf.addRule({
    name: 'common/space/insertFinalNewline',
    live: false,
    disabled: true,
    queue: 'end',
    handler(text) {
        return text[text.length - 1] === '\n' ? text : text + '\n';
    }
});
