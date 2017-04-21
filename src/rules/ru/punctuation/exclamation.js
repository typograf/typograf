Typograf.addRule({
    name: 'ru/punctuation/exclamation',
    live: false,
    handler: function(text) {
        return text
            .replace(/(^|[^!])!{2}($|[^!])/gm, '$1!$2')
            .replace(/(^|[^!])!{4}($|[^!])/gm, '$1!!!$2');
    }
});
