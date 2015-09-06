Typograf.rule({
    name: 'common/sym/copy',
    index: 10,
    handler: function(text) {
        return Typograf._replace(text, [
            [/\(r\)/gi, '®'],
            [/(copyright )?\((c|с)\)/gi, '©'],
            [/\(tm\)/gi, '™']
        ]);
    }
});
