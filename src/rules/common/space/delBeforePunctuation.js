Typograf.addRule({
    name: 'common/space/delBeforePunctuation',
    handler: function(text) {
        return text.replace(/ ([!;,?.:])(?!\))/g, '$1');
    }
});
