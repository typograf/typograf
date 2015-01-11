Typograf.rule({
    name: 'common/punctuation/delDoublePunctuation',
    sortIndex: 580,
    func: function(text) {
        return text.replace(/(,|:|;|\?){2,}/g, '$1');
    }
});
