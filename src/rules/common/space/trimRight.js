Typograf.addRule({
    name: 'common/space/trimRight',
    index: '-3',
    live: false,
    handler: String.prototype.trimRight ?
        (text) => text.trimRight() :
        /* istanbul ignore next */
        (text) => text.replace(/[\s\uFEFF\xA0]+$/g, '')
});
