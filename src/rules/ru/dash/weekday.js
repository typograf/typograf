Typograf.rule({
    name: 'ru/dash/weekday',
    index: 600,
    handler: function(text) {
        var part = '(' + Typograf.data('ru/weekday').join('|') + ')',
            re = new RegExp(part + ' ?(' + Typograf.data('common/dash') + ') ?' + part, 'gi');

        return text.replace(re, '$1' + this.setting('ru/dash/main', 'dashInterval') + '$3');
    }
});
