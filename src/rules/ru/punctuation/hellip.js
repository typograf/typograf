Typograf.rule({
    name: 'ru/punctuation/hellip', 
    sortIndex: 20, 
    func: function(text) {
        return text
            .replace(/(^|[^.])\.{3,4}([^.]|$)/g, '$1…$2')
            .replace(/(^|[^.])(\.\.\.|…),/g, '$1…')
            .replace(/(\!|\?)(\.\.\.|…)([^.]|$)/g, '$1..$3');
    }
});
