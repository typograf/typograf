Typograf.rule({
    title: 'Дефис перед то, либо, нибудь, ка, де, кась',
    name: 'ru/dash/to',
    sortIndex: 30,
    func: function(text) {
        var re = new RegExp('( | ?- ?)(то|либо|нибудь|ка|де|кась)' + Typograf._ruDashAfter, 'g');
        return text.replace(re, '-$2$3');
    }
});
