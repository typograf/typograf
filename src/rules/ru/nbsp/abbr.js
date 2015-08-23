Typograf.rule({
    name: 'ru/nbsp/abbr',
    index: 565,
    handler: function(text) {
        return text.replace(/(^|\s)([а-яё]{1,3}\.){2,}(?![а-яё])/g, function($0, $1) {
            var abbr = $0.split(/\./);
            // Являются ли сокращения ссылкой
            if(['рф', 'ру', 'рус', 'орг', 'укр', 'бг', 'срб'].indexOf(abbr[abbr.length - 2]) > -1) {
                return $0;
            }

            return $1 + $0.split(/\./).join('.\u00A0').trim();
        });
    }
});
