Typograf.addRule({
    name: 'ru/dash/taki',
    handler(text) {
        const re = new RegExp('(верно|довольно|опять|прямо|так|вс[её]|действительно|неужели)\\s(таки)' +
            Typograf.getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1-$2');
    }
});
