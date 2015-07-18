Typograf.rule({
    name: 'ru/dash/izza',
    sortIndex: 33,
    func: function(text) {
        var ruDash = Typograf.data('ru/dash'),
            re = new RegExp(ruDash.before + '(И|и)з за' + ruDash.after, 'g');

        return text.replace(re, '$1$2з-за$3');
    }
});
