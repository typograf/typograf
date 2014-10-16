Typograf.rule({
    title: 'Неразрывный пробел после XXXX',
    name: 'nbsp:xxxx',
    sortIndex: 1060,
    func: function(text) {
        return text.replace(/(^|\D)(\d{4}) ?г( |,|;|\.|\n|$)/g, '$1$2\u00A0г$3');
    }
});
