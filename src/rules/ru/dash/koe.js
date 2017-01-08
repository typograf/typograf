Typograf.addRule({
    name: 'ru/dash/koe',
    handler: function(text) {
        var re = new RegExp(this.getData('ru/dashBefore') +
            '([Кк]о[ей])\\s([а-яё]{3,})' +
            this.getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2-$3');
    }
});
