(function() {

var before = '(^| |\\n)',
    after = '( |,|\\.|\\?|:|!|$)';

Typograf.rule({
    title: 'Дефис перед то, либо, нибудь, ка, де, кась',
    name: 'ru/dash/to',
    sortIndex: 30,
    func: function(text) {
        var re = new RegExp('( | ?- ?)(то|либо|нибудь|ка|де|кась)' + after, 'g');
        return text.replace(re, '-$2$3');
    }
});

Typograf.rule({
    title: 'Дефис между из-за',
    name: 'ru/dash/izza',
    sortIndex: 33,
    func: function(text) {
        var re = new RegExp(before + '(И|и)з за' + after, 'g');
        return text.replace(re, '$1$2з-за$3');
    }
});

Typograf.rule({
    title: 'Дефис между из-под',
    name: 'ru/dash/izpod',
    sortIndex: 35,
    func: function(text) {
        var re = new RegExp(before + '(И|и)з под' + after, 'g');
        return text.replace(re, '$1$2з-под$3');
    }
});

Typograf.rule({
    title: 'Дефис после кое и кой',
    name: 'ru/dash/koe',
    sortIndex: 38,
    func: function(text) {
        var re = new RegExp(before + '(К|к)ое\\s([а-яё]{3,})' + after, 'g');
        text = text.replace(re, '$1$2ое-$3$4');
        
        var re2 = new RegExp(before + '(К|к)ой\\s([а-яё]{3,})' + after, 'g');
        return text.replace(re2, '$1$2ой-$3$4');
    }
});

Typograf.rule({
    title: 'Дефис между верно-таки и т.д.',
    name: 'ru/dash/taki',
    sortIndex: 39,
    func: function(text) {
        var re = new RegExp('(верно|довольно|опять|прямо|так|всё|действительно|неужели)\\s(таки)' + after, 'g');
        return text.replace(re, '$1-$2$3');
    }
});

})();
