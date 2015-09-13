Typograf.rule({
    name: 'common/nbsp/replaceNbsp',
    queue: 'utf',
    live: true,
    handler: function(text) {
        return text.replace(/\u00A0/g, ' ');
    }
});
