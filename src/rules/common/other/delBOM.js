Typograf.rule({
    name: 'common/other/delBOM',
    queue: 'start',
    handler: function(text) {
        if(text.charCodeAt(0) === 0xFEFF) {
            return text.slice(1);
        }

        return text;
    }
});
