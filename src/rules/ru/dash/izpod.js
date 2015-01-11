Typograf.rule({
    name: 'ru/dash/izpod',
    sortIndex: 35,
    func: function(text) {
        var re = new RegExp(Typograf._ruDashBefore +
            '(И|и)з под' +
            Typograf._ruDashAfter, 'g');

        return text.replace(re, '$1$2з-под$3');
    }
});
