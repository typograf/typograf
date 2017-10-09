Typograf.addRule({
    name: 'ru/dash/koe',
    handler(text) {
        const re = new RegExp(Typograf.getData('ru/dashBefore') +
            '([Кк]о[ей])\\s([а-яё]{3,})' +
            Typograf.getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2-$3');
    }
});
