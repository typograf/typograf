Typograf.addRule({
    name: 'common/space/delRepeatN',
    index: '-1',
    handler: function(text) {
        return text.replace(/\n{3,}/g, '\n\n');
    }
});
