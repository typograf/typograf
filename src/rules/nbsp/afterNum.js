Typograf.rule({
    title: 'Неразрывный пробел после № и §',
    name: 'nbsp/afterNum',
    sortIndex: 610,
    func: function(text) {
        return text.replace(/№ ?(\d)/g, '№\u00A0$1').replace(/§ ?(\d|I|V|X)/g, '§\u00A0$1');
    }
});
