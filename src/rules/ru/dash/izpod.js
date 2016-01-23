Typograf.rule({
    name: 'ru/dash/izpod',
    handler: function(text) {
        var re = new RegExp(this.data('ru/dashBefore') + '(И|и)з под' + this.data('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2з-под');
    }
});
