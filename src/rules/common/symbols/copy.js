Typograf.addRule({
    name: 'common/symbols/copy',
    handler: function(text) {
        return Typograf._replace(text, [
            [/\(r\)/gi, '®'],
            [/(copyright )?\((c|с)\)/gi, '©'],
            [/\(tm\)/gi, '™']
        ]);
    }
});
