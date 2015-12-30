Typograf.rule({
    name: 'ru/nbsp/initials',
    handler: function(text) {
        var spaces = '\u00A0 ',
            lquote = Typograf.data('ru/lquote'),
            rquote = Typograf.data('ru/rquote'),
            re = new RegExp('(^|[' + spaces + lquote +
                '"])([А-ЯЁ])\.[' + spaces + ']?([А-ЯЁ])\\.[' + spaces +
                ']?([А-ЯЁ][а-яё]+)(?=[\\s.,;:?!"' + rquote + ']|$)', 'gm');

        return text.replace(re, '$1$2.\u00A0$3.\u00A0$4');
    }
});
