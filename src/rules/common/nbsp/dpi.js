Typograf.rule({
    title: 'Нераз. пробел перед lpi, dpi',
    name: 'common/nbsp/dpi',
    sortIndex: 1150,
    func: function(text) {
        return text.replace(/(\d) ?(lpi|dpi)(?!\w)/, '$1\u00A0$2');
    }
});
