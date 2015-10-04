Typograf.rule({
    name: 'ru/dash/koe',
    handler: function(text) {
        var re = new RegExp(Typograf.data('ru/dashBefore') +
            '([Кк]о[ей])\\s([а-яё]{3,})' +
            Typograf.data('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2-$3$4');
    }
});
