Typograf.rule({
    title: 'Неразрывный пробел перед ли, ль, же, бы, б',
    name: 'nbsp/beforeParticle',
    sortIndex: 570,
    func: function(text) {
        return text.replace(/ (ли|ль|же|ж|бы|б)([^а-яёА-ЯЁ])/g, '\u00A0$1$2');
    }
});
