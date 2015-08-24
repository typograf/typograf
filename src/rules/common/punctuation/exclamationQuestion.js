Typograf.rule({
    name: 'common/punctuation/exclamationQuestion',
    index: 1140,
    handler: function(text) {
        var re = new RegExp('(^|[^!])!\\?([^?]|$)', 'g');
        return text.replace(re, '$1?!$2');
    }
});
