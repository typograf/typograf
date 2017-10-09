Typograf.addRule({
    name: 'common/space/squareBracket',
    handler(text) {
        return text
            .replace(/(\[) +/g, '[')
            .replace(/ +\]/g, ']');
    }
});
