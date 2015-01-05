Typograf.rule({
    title: 'Нераз. пробел после §',
    name: 'common/nbsp/afterPara',
    sortIndex: 610,
    func: function(text) {
        return text.replace(/§ ?(\d|I|V|X)/g, '§\u00A0$1');
    }
});
