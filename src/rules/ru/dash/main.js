Typograf.rule({
    title: 'Дефис на тире',
    name: 'ru/dash/main',
    sortIndex: 620,
    func: function(text) {
        var dashes = '(-|--|–|—)',
            re1 = new RegExp('( |\u00A0)' + dashes + '( |\\n)', 'g'),
            re2 = new RegExp('(X|I|V)(?: |\u00A0)?' + dashes + '(?: |\u00A0)?(X|I|V)', 'g');
        
        return text
            .replace(re1, '\u00A0' + this.setting('ru/dash/main', 'dash') + '$3')
            .replace(re2, '$1' + this.setting('ru/dash/main', 'dashInterval') + '$3');
    },
    settings: {
        dash: '\u2014', // &mdash;
        dashInterval: '\u2014' // &mdash;
    }
});
