Typograf.rule({
    name: 'ru/dash/izpod',
    handler: function(text) {
        var re = new RegExp(Typograf.data('ru/dashBefore') + '(И|и)з под' + Typograf.data('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2з-под$3');
    }
});
