(function() {

    var replacements = {
        A: 'А', // Latin: Russian
        a: 'а',
        B: 'В',
        E: 'Е',
        e: 'е',
        K: 'К',
        M: 'М',
        H: 'Н',
        O: 'О',
        o: 'о',
        P: 'Р',
        p: 'р',
        C: 'С',
        c: 'с',
        T: 'Т',
        y: 'у',
        X: 'Х',
        x: 'х'
    };

    var keys = Object.keys(replacements).join('');

    Typograf.addRule({
        name: 'ru/typo/switchingKeyboardLayout',
        handler: function(text) {
            var re = new RegExp('([' + keys + ']{1,3})(?=[А-ЯЁа-яё]+?)', 'g');

            return text.replace(re, function(str, $1) {
                var result = '';
                for (var i = 0; i < $1.length; i++) {
                    result += replacements[$1[i]];
                }

                return result;
            });
        }
    });

})();
