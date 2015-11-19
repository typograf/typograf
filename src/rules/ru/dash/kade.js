Typograf.rule({
    name: 'ru/dash/kade',
    handler: function(text) {
        var reKa = new RegExp('([a-яё]+) ка(сь)?' + Typograf.data('ru/dashAfter'), 'g'),
            reDe = new RegExp('([a-яё]+) де' + Typograf.data('ru/dashAfterDe'), 'g');

        return text
            .replace(reKa, '$1-ка$2')
            .replace(reDe, '$1-де');
    }
});
