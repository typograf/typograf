Typograf.addRule({
    name: 'ru/punctuation/exclamation',
    live: false,
    handler: function(text) {
        return text
            .replace(/(^|[^!])!{2}($|[^!])/, '$1!$2')
            .replace(/(^|[^!])!{4}($|[^!])/, '$1!!!$2');
    }
});
