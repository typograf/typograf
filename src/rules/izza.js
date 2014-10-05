(function() {

var before = '(^| |\\n)',
    after = '( |,|\\.|\\?|\\:|\\!|$)';

Typograf.rule('to', 30, function(text) {
     var re = new RegExp('( | ?- ?)(то|либо|нибудь|ка|де|кась)' + after, 'g');
    return text.replace(re, '-$2$3');
});

Typograf.rule('izza', 33, function(text) {
    var re = new RegExp(before + '(И|и)з за' + after, 'g');
    return text.replace(re, '$1$2з-за$3');
});

Typograf.rule('izpod', 35, function(text) {
    var re = new RegExp(before + '(И|и)з под' + after, 'g');
    return text.replace(re, '$1$2з-под$3');
});

Typograf.rule('koe', 38, function(text) {
    var re = new RegExp(before + '(К|к)ое\\s([а-я]{3,})' + after, 'g');
    text = text.replace(re, '$1$2ое-$3$4');
    
    var re2 = new RegExp(before + '(К|к)ой\\s([а-я]{3,})' + after, 'g');
    return text.replace(re2, '$1$2ой-$3$4');
});

Typograf.rule('taki', 39, function(text) {
    var re = new RegExp('(верно|довольно|опять|прямо|так|всё|действительно|неужели)\\s(таки)' + after, 'g');
    return text.replace(re, '$1-$2$3');
});

})();
