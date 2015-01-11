Typograf.rule({
    name: 'ru/dash/izza',
    sortIndex: 33,
    func: function(text) {
        var re = new RegExp(Typograf._ruDashBefore +
            '(И|и)з за' +
            Typograf._ruDashAfter, 'g');

        return text.replace(re, '$1$2з-за$3');
    }
});
