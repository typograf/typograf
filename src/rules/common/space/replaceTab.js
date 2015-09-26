Typograf.rule({
    name: 'common/space/replaceTab',
    index: '-5',
    handler: function(text) {
        return text.replace(/\t/g, '    ');
    }
});
