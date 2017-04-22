Typograf.addRule({
    name: 'ru/space/year',
    handler: function(text, settings, context) {
        var re = new RegExp('(^| |\u00A0)(\\d{3,4})(год([ауе]|ом)?)([^' +
            context.getData('char') + ']|$)', 'g');
        return text.replace(re, '$1$2 $3$5');
    }
});
