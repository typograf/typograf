Typograf.addRule({
    name: 'ru/nbsp/see',
    handler(text) {
        const re = new RegExp('(^|\\s|' + Typograf._privateLabel + '|\\()(см|им)\\.[ \u00A0]?([а-яё0-9a-z]+)([\\s.,?!]|$)', 'gi');

        return text.replace(re, function($0, $1, $2, $3, $4) {
            return ($1 === '\u00A0' ? ' ' : $1) + $2 + '.\u00A0' + $3 + $4;
        });
    }
});
