Typograf.rule({
    name: 'common/punctuation/delDoublePunctuation',
    index: 580,
    handler: function(text) {
        return text.replace(/(,|:|;|\?){2,}/g, '$1');
    }
});
