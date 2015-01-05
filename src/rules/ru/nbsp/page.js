Typograf.rule({
    title: 'Нераз. пробел перед стр., гл., рис., илл.',
    name: 'ru/nbsp/page',
    sortIndex: 610,
    func: function(text) {
        return text.replace(/ (стр|гл|рис|илл)\./g, '\u00A0$1.');
    }
});
