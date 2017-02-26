Typograf.addRule({
    name: 'ru/nbsp/initials',
    handler: function(text) {
        var spaces = '\u00A0\u202F ', // nbsp, thinsp
            quote = this.getData('ru/quote'),
            re = new RegExp('(^|[' + spaces +
                quote.left +
                Typograf._privateLabel +
                '"])([А-ЯЁ])\\.[' + spaces + ']?([А-ЯЁ])\\.[' + spaces +
                ']?([А-ЯЁ][а-яё]+)(?=[\\s.,;:?!"' + quote.right + ']|$)', 'gm');

        return text.replace(re, '$1$2.\u00A0$3.\u00A0$4');
    }
});
