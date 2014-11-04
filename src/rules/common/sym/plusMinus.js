Typograf.rule({
    title: '+- → ±',
    name: 'common/sym/plusMinus',
    sortIndex: 1010,
    func: function(text) {
        var re = new RegExp('(^| |\\>|\u00A0)\\+-(\\d)', 'g');
        return text.replace(re, '$1±$2').replace(/(^\s*)\+-(\s*$)/g, '$1±$2');
    }
});
