Typograf.rule({
    name: 'ru/nbsp/groupNumbers',
    handler: function(text) {
        return text.replace(/(^ ?|\D )(\d{1,3}([ \u00A0\u202F\u2009]\d{3})+)(?! ?[\d-])/gm, function($0, $1, $2) {
            return $1 + $2.replace(/\s/g, '\u202F');
        });
    }
});
