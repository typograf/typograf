Typograf.rule({
    title: 'Удаление повтора слова',
    name: 'common/repeatWord',
    sortIndex: 1200,
    func: function(text) {
        return text.replace(/([a-zа-яё]+) \1([;:,.?! \n])/gi, '$1$2');
    },
    enabled: false
});
