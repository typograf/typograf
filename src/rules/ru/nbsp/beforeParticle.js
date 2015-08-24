Typograf.rule({
    name: 'ru/nbsp/beforeParticle',
    index: 570,
    handler: function(text) {
        return text.replace(/ (ли|ль|же|ж|бы|б)([^а-яёА-ЯЁ])/g, '\u00A0$1$2');
    }
});
