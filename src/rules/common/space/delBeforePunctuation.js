Typograf.rule({
    name: 'common/space/delBeforePunctuation',
    index: 550,
    handler: function(text) {
        return text.replace(/ ([!;,?.:])/g, '$1');
    }
});
