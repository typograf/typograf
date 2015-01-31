Typograf.rule({
    name: 'ru/dash/month',
    sortIndex: 610,
    func: function(text) {
        var part = '(' + this.data('ru/month').join('|') + ')',
            re = new RegExp(part + ' ?(' + this.data('common/dash') + ') ?' + part, 'gi');

        return text.replace(re, '$1' + this.setting('ru/dash/main', 'dashInterval') + '$3');
    }
});
