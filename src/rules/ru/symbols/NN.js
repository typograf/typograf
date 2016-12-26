Typograf.rule({
    name: 'ru/symbols/NN',
    handler: function(text) {
        return text.replace(/№№/g, '№');
    }
});
