Typograf.rule({
    title: 'Дефис на тире',
    name: 'dash/main',
    sortIndex: 620,
    func: function(text) {
        var re = new RegExp('(\\s|\u00A0)(-|—)(\\s|\\n)', 'g');
        
        return text
            .replace(re, '\u00A0—$3')
            .replace(/(X|I|V)(?: |\u00A0)?(-|—)(?: |\u00A0)?(X|I|V)/g, '$1—$3');
    },
    settings: {
        dash: '\u2014',
        dashInterval: '\u2014'
    }
});
