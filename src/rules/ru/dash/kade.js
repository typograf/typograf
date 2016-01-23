Typograf.rule({
    name: 'ru/dash/kade',
    handler: function(text) {
        var reKa = new RegExp('([a-яё]+) ка(сь)?' + this.data('ru/dashAfter'), 'g'),
            reDe = new RegExp('([a-яё]+) де' + this.data('ru/dashAfterDe'), 'g');

        return text
            .replace(reKa, '$1-ка$2')
            .replace(reDe, '$1-де');
    }
});
