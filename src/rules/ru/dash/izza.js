Typograf.rule({
    name: 'ru/dash/izza',
    handler: function(text) {
        var re = new RegExp(Typograf.data('ru/dashBefore') + '(И|и)з за' + Typograf.data('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2з-за');
    }
});
