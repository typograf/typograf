Typograf.rule({
    name: 'common/sym/copy',
    sortIndex: 10,
    func: function(text) {
        return text.replace(/\(r\)/gi, '®')
            .replace(/(copyright )?\((c|с)\)/gi, '©')
            .replace(/\(tm\)/gi, '™');
    }
});
