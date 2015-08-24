Typograf.rule({
    name: 'ru/number/ordinals',
    index: 1300,
    handler: function(text) {
        return text
            .replace(/(\d)-(ый|ой)([^а-яё]|$)/g, '$1-й$3')
            .replace(/(\d)-ая([^а-яё]|$)/g, '$1-я$2')
            .replace(/(\d)-(ое|ые)([^а-яё]|$)/g, '$1-е$3')
            .replace(/(\d)-(ым|ом)([^а-яё]|$)/g, '$1-м$3')
            .replace(/(\d)-ых([^а-яё]|$)/g, '$1-х$2')
            .replace(/(\d)-ого([^а-яё]|$)/g, '$1-го$2')
            .replace(/(\d)-ому([^а-яё]|$)/g, '$1-му$2')
            .replace(/(\d)-ыми([^а-яё]|$)/g, '$1-ми$2');
    }
});
