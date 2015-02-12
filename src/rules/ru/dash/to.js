(function() {

var words = [
    'откуда', 'куда', 'где',
    'когда', 'зачем', 'почему',
    'как', 'како[ейм]', 'какая', 'каки[емх]', 'какими', 'какую', 
    'что', 'чего', 'че[йм]', 'чьим?',
    'кто', 'кого', 'кому', 'кем'
];

Typograf.rule({
    name: 'ru/dash/to',
    sortIndex: 30,
    func: function(text) {
        var re = new RegExp('(' + words.join('|') + ')( | ?- ?)(то|либо|нибудь)' + this.data('ru/dash').after, 'gi');
        return text.replace(re, '$1-$3$4');
    }
});

})();
