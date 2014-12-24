Typograf.rule({
    title: 'Три точки на троеточие', 
    name: 'common/punctuation/hellip', 
    sortIndex: 20, 
    func: function(text) {
        return text.replace(/(^|[^.])\.{3,4}([^.]|$)/g, '$1…$2');
    }
});
