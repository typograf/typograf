Typograf.rule({
    title: 'Дефис между днями недели',
    name: 'ru/dash/weekday',
    sortIndex: 600,
    func: function(text) {
        var part = '(' + this.data['ru/weekday'].join('|') + ')',
            re = new RegExp(part + ' ?(-|—) ?' + part, 'gi');

        return text.replace(re, '$1' + this.setting('ru/dash/main', 'dashInterval') + '$3');
    }
});
