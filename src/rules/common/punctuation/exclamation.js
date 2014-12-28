Typograf.rule({
    title: '!! → !',
    name: 'common/punctuation/exclamation',
    sortIndex: 1150,
    func: function(text) {
        return text
            .replace(/(^|[^!])!{2}($|[^!])/, '$1!$2')
            .replace(/(^|[^!])!{4}?($|[^!])/, '$1!!!$2');
    }
});
