Typograf.addRule({
    name: 'ru/punctuation/hellipQuestion',
    handler: function(text) {
        return text
            .replace(/(^|[^.])(\.\.\.|…),/g, '$1…')
            .replace(/(!|\?)(\.\.\.|…)(?=[^.]|$)/g, '$1..');
    }
});
