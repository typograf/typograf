Typograf.rule({
    title: 'Удаление пробела перед %',
    name: 'space:del_before_percent',
    sortIndex: 600,
    func: function(text) {
        return text.replace(/(\d)( |\u00A0)%/g, '$1%');
    }
});
