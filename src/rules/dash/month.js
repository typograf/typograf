Typograf.rule({
    title: 'Дефис между месяцами',
    name: 'dash/month',
    sortIndex: 610,
    func: function(text) {
        var part = '(' + this.data.month.join('|') + ')',
            re = new RegExp(part + ' ?(-|—) ?' + part, 'gi');

        return text.replace(re, '$1' + this.setting('dash/main', 'dashInterval') + '$3');
    }
});
