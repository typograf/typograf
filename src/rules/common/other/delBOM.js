Typograf.rule({
    name: 'common/other/delBOM',
    queue: 'start',
    index: 0,
    handler: function(text) {
        if(text.charCodeAt(0) === 0xFEFF) {
            return text.slice(1);
        }

        if(text.slice(0, 3) === '\xEF\xBB\xBF') {
            return text.slice(3);
        }

        return text;
    }
});
