Typograf.rule({
    name: 'ru/punctuation/apostrophe',
    index: '-5',
    handler: function(text) {
        var letters = '([' + this._data('l') + '])',
            re = new RegExp(letters + '[\'’]' + letters, 'gi');

        return text.replace(re, '$1ʼ$2');
    }
});
