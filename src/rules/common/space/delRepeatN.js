Typograf.rule({
    name: 'common/space/delRepeatN',
    index: 545,
    handler: function(text) {
        return text.replace(/\n{3,}/g, '\n\n');
    }
});
