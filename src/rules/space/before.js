Typograf.rule({
    name: '-space:before',
    sortIndex: 500,
    func: function(text) {
        return text.replace(/\r/g, '');
    }
});
