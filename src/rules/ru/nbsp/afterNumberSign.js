Typograf.rule({
    name: 'ru/nbsp/afterNumberSign',
    index: 610,
    handler: function(text) {
        return text.replace(/№ ?(\d|п\/п)/g, '№\u00A0$1');
    }
});
