Typograf.rule({
    name: 'ru/dash/main',
    sortIndex: 620,
    func: function(text) {
        var name = 'ru/dash/main',
            dashes = '(' + this.data('common/dash') + ')',
            reMain = new RegExp('( |\u00A0)' + dashes + '( |\\n)', 'g'),
            reDirect = new RegExp('(^|\n)' + dashes + '( |\u00A0)', 'g'),
            reInterval = new RegExp('(X|I|V)(?: |\u00A0)?' + dashes + '(?: |\u00A0)?(X|I|V)', 'g');

        return text
            .replace(reMain, '\u00A0' + this.setting(name, 'dash') + '$3')
            .replace(reDirect, '$1' + this.setting(name, 'dash') + '\u00A0')
            .replace(reInterval, '$1' + this.setting(name, 'dashInterval') + '$3');
    },
    settings: {
        dash: '\u2014', // &mdash;
        dashInterval: '\u2014' // &mdash;
    }
});
