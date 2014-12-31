Typograf.rule({
    title: 'Замена таба на 4 пробела',
    name: 'common/space/replaceTab',
    sortIndex: 510,
    func: function(text) {
        return text.replace(/\t/g, ' ');
    }
});
