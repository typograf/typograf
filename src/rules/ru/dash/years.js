Typograf.addRule({
    name: 'ru/dash/years',
    handler: function(text, settings) {
        var dashes = this.getData('common/dash'),
            re = new RegExp('(\\D|^)(\\d{4})[ \u00A0]?(' +
                dashes + ')[ \u00A0]?(\\d{4})(?=[ \u00A0]?г)', 'g');

        return text.replace(re, function($0, $1, $2, $3, $4) {
            if (parseInt($2, 10) < parseInt($4, 10)) {
                return $1 + $2 + settings.dash + $4;
            }

            return $0;
        });
    },
    settings: {
        dash: '\u2013' // &ndash;
    }
});
