Typograf.rule({
    title: 'Удаление пробела перед %',
    name: 'space:del_before_percent',
    sortIndex: 600,
    func: function(text) {
        return text.replace(/\d( |\u0A00)%/g, '%');
    }
});
