Typograf.rule({
    name: 'ru/dash/to',
    sortIndex: 30,
    func: function(text) {
        var re = new RegExp('( | ?- ?)(то|либо|нибудь|ка|де|кась)' + this.data('ru/dash').after, 'g');
        return text.replace(re, '-$2$3');
    }
});
