Typograf.rule({
    name: 'ru/nbsp/abbr',
    index: 565,
    handler: function(text) {
        var re = new RegExp('(^|\\s|' + Typograf._privateLabel + ')(([а-яё]{1,3}\\.){2,})(?![а-яё])', 'g');
        return text.replace(re, function($0, $1, $2) {
            var abbr = $2.split(/\./);
            // Являются ли сокращения ссылкой
            if(['рф', 'ру', 'рус', 'орг', 'укр', 'бг', 'срб'].indexOf(abbr[abbr.length - 2]) > -1) {
                return $0;
            }

            return $1 + $2.split(/\./).join('.\u00A0').trim();
        });
    }
});
