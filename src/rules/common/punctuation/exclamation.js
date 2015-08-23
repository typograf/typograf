Typograf.rule({
    name: 'common/punctuation/exclamation',
    index: 1150,
    handler: function(text) {
        return text
            .replace(/(^|[^!])!{2}($|[^!])/, '$1!$2')
            .replace(/(^|[^!])!{4}($|[^!])/, '$1!!!$2');
    }
});
