Typograf.rule({
    name: 'common/space/delRepeatSpace',
    index: '-1',
    handler: function(text) {
        return text.replace(/([^\n \t])( |\t){2,}([^\n \t])/g, '$1$2$3');
    }
});
