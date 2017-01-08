Typograf.addRule({
    name: 'ru/dash/izza',
    handler: function(text) {
        var re = new RegExp(this.getData('ru/dashBefore') + '(И|и)з за' + this.getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2з-за');
    }
});
