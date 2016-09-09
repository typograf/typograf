Typograf.rule({
    name: 'ru/punctuation/quote',
    handler: function(text, settings) {
        var lquote = settings.lquote,
            rquote = settings.rquote;

        text = this._quote(text, settings);
        if (lquote === settings.lquote2 && rquote === settings.rquote2) {
            return text
                // ««Энергия» Синергия» -> «Энергия» Синергия»
                .replace(new RegExp(lquote + lquote, 'g'), lquote)
                // «Энергия «Синергия»» -> «Энергия «Синергия»
                .replace(new RegExp(rquote + rquote, 'g'), rquote);
        }

        return text;
    },
    settings: {
        lquote: '«',
        rquote: '»',
        lquote2: '„',
        rquote2: '“',
        lquote3: '‚',
        rquote3: '‘'
    }
});
