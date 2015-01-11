Typograf.rule({
    name: 'ru/nbsp/afterNumberSign',
    sortIndex: 610,
    func: function(text) {
        return text.replace(/№ ?(\d|п\/п)/g, '№\u00A0$1');
    }
});
