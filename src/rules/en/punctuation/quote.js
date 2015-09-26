Typograf.rule({
    name: 'en/punctuation/quote',
    handler: function(text, settings) {
        return this._quote(text, settings);
    },
    settings: {
        lquote: '“',
        rquote: '”',
        lquote2: '‘',
        rquote2: '’'
    }
});
