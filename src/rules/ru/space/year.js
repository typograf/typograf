Typograf.rule({
    name: 'ru/space/year',
    handler: function(text) {
        var re = new RegExp('(^| |\u00A0)(\\d{3,4})(год([ауе]|ом)?)([^' +
            this.data('l') + ']|$)', 'g');
        return text.replace(re, '$1$2 $3$5');
    }
});
