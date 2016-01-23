Typograf.rule({
    name: 'ru/dash/izza',
    handler: function(text) {
        var re = new RegExp(this.data('ru/dashBefore') + '(И|и)з за' + this.data('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2з-за');
    }
});
