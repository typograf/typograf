Typograf.rule({
    name: 'ru/nbsp/m',
    index: 1030,
    handler: function(text) {
        var label = Typograf._privateLabel,
            re = new RegExp('(^|[\\s,.' + label + '])' +
                '(\\d+)[ \u00A0]?(мм?|см|км|дм|гм|mm?|km|cm|dm)([23²³])?([\\s.!?,;' +
                label + ']|$)', 'gm');

        // jshint maxparams:6
        return text.replace(re, function($0, $1, $2, $3, $4, $5) {
            var pow = {
                '2': '²',
                '²': '²',
                '3': '³',
                '³': '³',
                '': ''
            }[$4 || ''];

            return $1 + $2 + '\u00A0' + $3 + pow + ($5 === '\u00A0' ? ' ': $5);
        });
    }
});
