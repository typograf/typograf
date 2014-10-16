Typograf.rule({
    title: '+- → ±',
    name: 'plus_minus',
    sortIndex: 1010,
    func: function(text) {
        var re = new RegExp('(^| |\\>|\00uA0)\\+-(\\d)', 'g');
        return text.replace(re, '$1±$2');
    }
});
