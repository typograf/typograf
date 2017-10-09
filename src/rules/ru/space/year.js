Typograf.addRule({
    name: 'ru/space/year',
    handler(text, settings, context) {
        const re = new RegExp('(^| |\u00A0)(\\d{3,4})(год([ауе]|ом)?)([^' +
            context.getData('char') + ']|$)', 'g');

        return text.replace(re, '$1$2 $3$5');
    }
});
