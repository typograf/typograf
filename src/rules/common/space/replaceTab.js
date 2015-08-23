Typograf.rule({
    name: 'common/space/replaceTab',
    index: 510,
    handler: function(text) {
        return text.replace(/\t/g, ' ');
    }
});
