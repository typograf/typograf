Typograf.rule({
    title: 'Неразрывный пробел после № и §',
    name: 'nbsp:after_num',
    sortIndex: 610,
    func: function(text) {
        return text.replace(/№(\d)/g, '№\u00A0$1').replace(/§(\d|I|V|X)/g, '§\u00A0$1');
    }
});
