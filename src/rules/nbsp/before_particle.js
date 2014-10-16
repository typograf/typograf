Typograf.rule({
    title: 'Неразрывный пробел перед ли, ль, же, бы, б',
    name: 'nbsp:before_particle',
    sortIndex: 570,
    func: function(text) {
        return text.replace(/ (ли|ль|же|ж|бы|б)([^а-яА-Я])/g, '\u00A0$1$2');
    }
});
