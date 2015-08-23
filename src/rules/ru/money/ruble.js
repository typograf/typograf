Typograf.rule({
    name: 'ru/money/ruble',
    index: 1145,
    handler: function(text) {
        var rep = '$1\u00A0₽';
        return text
            .replace(/^(\d+)( |\u00A0)?(р|руб)\.$/, rep)
            .replace(/(\d+)( |\u00A0)?(р|руб)\.(?=[!?,:;])/g, rep)
            .replace(/(\d+)( |\u00A0)?(р|руб)\.(?=\s+[A-ЯЁ])/g, rep + '.');
    },
    disabled: true
});
