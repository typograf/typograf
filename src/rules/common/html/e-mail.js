Typograf.addRule({
    name: 'common/html/e-mail',
    queue: 'end',
    handler: function(text) {
        return this._isHTML ? text : text.replace(
            /(^|[\s;(])([\w\-.]{2,})@([\w\-.]{2,})\.([a-z]{2,6})([)\s.,!?]|$)/gi,
            '$1<a href="mailto:$2@$3.$4">$2@$3.$4</a>$5'
        );
    },
    disabled: true
});
