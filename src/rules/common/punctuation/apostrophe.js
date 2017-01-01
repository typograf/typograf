Typograf.rule({
    name: 'common/punctuation/apostrophe',
    handler: function(text) {
        var letters = '([' + this.data('l') + '])',
            re = new RegExp(letters + '\'' + letters, 'gi');

        return text.replace(re, '$1’$2');
    }
});
