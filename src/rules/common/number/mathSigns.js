Typograf.addRule({
    name: 'common/number/mathSigns',
    handler(text) {
        return Typograf._replace(text, [
            [/!=/g, '≠'],
            [/<=/g, '≤'],
            [/(^|[^=])>=/g, '$1≥'],
            [/<=>/g, '⇔'],
            [/<</g, '≪'],
            [/>>/g, '≫'],
            [/~=/g, '≅'],
            [/(^|[^+])\+-/g, '$1±']
        ]);
    }
});
