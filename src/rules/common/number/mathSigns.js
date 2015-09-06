Typograf.rule({
    name: 'common/number/mathSigns',
    index: 1010,
    handler: function(text) {
        return Typograf._replace(text, [
            [/!=/g, '≠'],
            [/<=/g, '≤'],
            [/(^|[^=])>=/g, '$1≥'],
            [/<=>/g, '⇔'],
            [/<</g, '≪'],
            [/>>/g, '≫'],
            [/~=/g, '≅'],
            [/\+-/g, '±']
        ]);
    }
});
