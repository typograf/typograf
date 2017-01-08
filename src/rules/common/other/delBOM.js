Typograf.addRule({
    name: 'common/other/delBOM',
    queue: 'start',
    index: -1,
    handler: function(text) {
        if (text.charCodeAt(0) === 0xFEFF) {
            return text.slice(1);
        }

        return text;
    }
});
