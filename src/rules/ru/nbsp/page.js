Typograf.rule({
    name: 'ru/nbsp/page',
    index: 610,
    handler: function(text) {
        return text.replace(/ (стр|гл|рис|илл)\./g, '\u00A0$1.');
    }
});
