Typograf.addRule({
    name: 'common/space/squareBracket',
    handler: function(text) {
        return text
            .replace(/(\[) +/g, '[')
            .replace(/ +\]/g, ']');
    }
});
