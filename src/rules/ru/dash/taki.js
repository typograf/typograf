Typograf.rule({
    name: 'ru/dash/taki',
    sortIndex: 39,
    func: function(text) {
        var re = new RegExp('(верно|довольно|опять|прямо|так|вс[её]|действительно|неужели)\\s(таки)' +
            this.data('ru/dash').after, 'g');

        return text.replace(re, '$1-$2$3');
    }
});
