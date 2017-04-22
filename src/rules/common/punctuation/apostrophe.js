Typograf.addRule({
    name: 'common/punctuation/apostrophe',
    handler: function(text, settings, context) {
        var letters = '([' + context.getData('char') + '])',
            re = new RegExp(letters + '\'' + letters, 'gi');

        return text.replace(re, '$1’$2');
    }
});
