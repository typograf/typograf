Typograf.rule({
    title: 'Добавление ° к C и F',
    name: 'cf',
    sortIndex: 1020,
    func: function(text) {
        var re = new RegExp('(\\d+)( |\u00A0)?(C|F)([\\W \\.,:\\!\\?"\\]\\)]|$)', 'g');

        return text.replace(re, '$1' + '\u2009' + '°$3$4');
    }
});
