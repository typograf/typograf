Typograf.rule({
    name: 'ru/punctuation/exclamationQuestion',
    index: '+5',
    handler: function(text) {
        var re = new RegExp('(^|[^!])!\\?([^?]|$)', 'g');
        return text.replace(re, '$1?!$2');
    }
});
