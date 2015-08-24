Typograf.rule({
    name: 'common/sym/copy',
    index: 10,
    handler: function(text) {
        return text.replace(/\(r\)/gi, '®')
            .replace(/(copyright )?\((c|с)\)/gi, '©')
            .replace(/\(tm\)/gi, '™');
    }
});
