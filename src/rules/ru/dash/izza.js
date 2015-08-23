Typograf.rule({
    name: 'ru/dash/izza',
    index: 33,
    handler: function(text) {
        var ruDash = Typograf.data('ru/dash'),
            re = new RegExp(ruDash.before + '(И|и)з за' + ruDash.after, 'g');

        return text.replace(re, '$1$2з-за$3');
    }
});
