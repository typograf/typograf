Typograf.addRule({
    name: 'ru/nbsp/abbr',
    handler(text) {
        function abbr($0, $1, $2, $3) {
            // Являются ли сокращения ссылкой
            if (['рф', 'ру', 'рус', 'орг', 'укр', 'бг', 'срб'].indexOf($3) > -1) {
                return $0;
            }

            return $1 + $2 + '.' + '\u00A0' + $3 + '.';
        }

        const re = new RegExp('(^|\\s|' + Typograf._privateLabel + ')([а-яё]{1,3})\\. ?([а-яё]{1,3})\\.', 'g');

        return text
            .replace(re, abbr)
            // Для тройных сокращений - а.е.м.
            .replace(re, abbr);
    }
});
