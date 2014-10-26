Typograf.rule({
    title: 'Дефис между днями недели',
    name: 'dash:weekday',
    sortIndex: 600,
    func: function(text) {
        var part = '(' + this.data.weekdays.join('|') + ')',
            re = new RegExp(part + ' ?(-|—) ?' + part, 'gi');

        return text.replace(re, '$1' + this.setting('dashInterval') + '$3');
    }
});
