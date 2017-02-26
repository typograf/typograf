Typograf.addRule({
    name: 'ru/dash/de',
    handler: function(text) {
        var re = new RegExp('([a-яё]+) де' + this.getData('ru/dashAfterDe'), 'g');

        return text.replace(re, '$1-де');
    },
    disabled: true
});
