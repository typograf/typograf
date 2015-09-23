Typograf.rule({
    name: 'ru/punctuation/apostrophe',
    index: 695,
    handler: function(text) {
        var letters = '([' + this.letters() + '])',
            re = new RegExp(letters + '[\'’]' + letters, 'gi');

        return text.replace(re, '$1ʼ$2');
    }
});
