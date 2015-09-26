Typograf.rule({
    name: 'common/space/trimLeft',
    index: '-4',
    handler: String.prototype.trimLeft ? function(text) {
        return text.trimLeft();
    } : /* istanbul ignore next */ function(text) {
        return text.replace(/^[\s\uFEFF\xA0]+/g, '');
    }
});
