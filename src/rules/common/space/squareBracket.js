Typograf.rule({
    name: 'common/space/squareBracket',
    index: 560,
    handler: function(text) {
        return text
            .replace(/(\[) +/g, '[')
            .replace(/ +\]/g, ']');
    }
});
