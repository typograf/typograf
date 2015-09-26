Typograf.rule({
    name: 'ru/dash/years',
    handler: function(text) {
        var dash = this.setting('ru/dash/years', 'dash'),
            dashes = Typograf.data('common/dash'),
            re = new RegExp('(\\D|^)(\\d{4})[ \u00A0]?(' +
                dashes + ')[ \u00A0]?(\\d{4})(?=[ \u00A0]?г)', 'g');

        return text.replace(re, function($0, $1, $2, $3, $4) {
            if(parseInt($2, 10) < parseInt($4, 10)) {
                return $1 + $2 + dash + $4;
            }

            return $0;
        });
    },
    settings: {
        dash: '\u2014' // &mdash;
    }
});
