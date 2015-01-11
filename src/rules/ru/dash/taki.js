Typograf.rule({
    name: 'ru/dash/taki',
    sortIndex: 39,
    func: function(text) {
        var re = new RegExp('(верно|довольно|опять|прямо|так|всё|действительно|неужели)\\s(таки)' +
            Typograf._ruDashAfter, 'g');

        return text.replace(re, '$1-$2$3');
    }
});
