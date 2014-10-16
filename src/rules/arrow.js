Typograf.rule({
    title: '-> → →, <- → ←',
    name: 'arrow',
    sortIndex: 1130,
    func: function(text) {
        return text.replace(/->[^>]/g, '→').replace(/[^<]<-/g, '←');
    }
});
