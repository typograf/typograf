Typograf.addRule({
    name: 'ru/symbols/NN',
    handler: function(text) {
        return text.replace(/№№/g, '№');
    }
});
