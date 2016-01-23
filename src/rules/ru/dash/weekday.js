Typograf.rule({
    name: 'ru/dash/weekday',
    handler: function(text) {
        var part = '(' + this.data('ru/weekday') + ')',
            re = new RegExp(part + ' ?(' + this.data('common/dash') + ') ?' + part, 'gi');

        return text.replace(re, '$1\u2014$3');
    }
});
