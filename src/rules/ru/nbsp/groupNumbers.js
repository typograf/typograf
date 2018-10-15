Typograf.addRule({
    name: 'ru/nbsp/groupNumbers',
    handler(text) {
        const re = new RegExp(`(^ ?|\\D |${Typograf._privateLabel})(\\d{1,3}([ \u00A0\u202F\u2009]\\d{3})+)(?! ?[\\d-])`, 'gm');

        return text.replace(re, function($0, $1, $2) {
            return $1 + $2.replace(/\s/g, '\u202F');
        });
    }
});
