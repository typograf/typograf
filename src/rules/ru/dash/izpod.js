Typograf.rule({
    name: 'ru/dash/izpod',
    index: 35,
    handler: function(text) {
        var ruDash = Typograf.data('ru/dash'),
            re = new RegExp(ruDash.before + '(И|и)з под' + ruDash.after, 'g');

        return text.replace(re, '$1$2з-под$3');
    }
});
