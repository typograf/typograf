Typograf.addRule({
    name: 'common/punctuation/quoteLink',
    queue: 'show-safe-tags-html',
    index: '+5',
    handler: function(text) {
        var quotes = this.getSetting('common/punctuation/quote', this._locale[0]);

        if (!quotes) { return text; }
        var entities = Typograf.HtmlEntities,
            lquote1 = entities.getByUtf(quotes.left[0]),
            rquote1 = entities.getByUtf(quotes.right[0]),
            lquote2 = entities.getByUtf(quotes.left[1]),
            rquote2 = entities.getByUtf(quotes.right[1]);

        lquote2 = lquote2 ? ('|' + lquote2) : '';
        rquote2 = rquote2 ? ('|' + rquote2) : '';

        var re = new RegExp('(<[aA]\\s[^>]*?>)(' + lquote1 + lquote2 + ')([^]*?)(' + rquote1 + rquote2 + ')(</[aA]>)', 'g');

        return text.replace(re, '$2$1$3$5$4');
    }
});
