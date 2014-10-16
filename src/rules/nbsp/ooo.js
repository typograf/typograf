Typograf.rule({
    title: 'Неразрывный пробел после OOO или ОАО',
    name: 'nbsp:ooo',
    sortIndex: 1100,
    func: function(text) {
        return text.replace(/(ООО|ОАО) /g, '$1\u00A0');
    }
});
