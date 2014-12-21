Typograf.rule({
    title: '5-ый, -ой, -ая, -ое, -ые, -ым, -ом, -ых → 5-й, -я, -е, -м, х',
    name: 'ru/number/ordinal',
    sortIndex: 1300,
    func: function(text) {
        return text
            .replace(/(\d)-(ый|ой)/g, '$1-й')
            .replace(/(\d)-ая/g, '$1-я')
            .replace(/(\d)-(ое|ые)/g, '$1-е')
            .replace(/(\d)-(ым|ом)/g, '$1-м')
            .replace(/(\d)-ых/g, '$1-х')
            .replace(/(\d)-ого/g, '$1-го')
            .replace(/(\d)-ому/g, '$1-му')
            .replace(/(\d)-ыми/g, '$1-ми');
    }
});
