Typograf.addRule({
    name: 'ru/dash/izpod',
    handler: function(text) {
        var re = new RegExp(this.getData('ru/dashBefore') + '(И|и)з под' + this.getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2з-под');
    }
});
