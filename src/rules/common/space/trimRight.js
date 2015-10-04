Typograf.rule({
    name: 'common/space/trimRight',
    index: '-3',
    live: false,
    handler: String.prototype.trimRight ? function(text) {
        return text.trimRight();
    } : /* istanbul ignore next */ function(text) {
        return text.replace(/[\s\uFEFF\xA0]+$/g, '');
    }
});
