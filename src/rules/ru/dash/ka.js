Typograf.rule({
    name: 'ru/dash/ka',
    handler: function(text) {
        var re = new RegExp('([a-яё]+) ка(сь)?' + this.data('ru/dashAfter'), 'g');

        return text.replace(re, '$1-ка$2');
    }
});
