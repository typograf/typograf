Typograf.rule({
    name: 'common/punctuation/delDoublePunctuation',
    index: 580,
    handler: function(text) {
        return text
            .replace(/(^|[^,]),,(?!,)/g, '$1,')
            .replace(/(^|[^:])::(?!:)/g, '$1:')
            .replace(/(^|[^!?\.])\.\.(?!\.)/g, '$1.')
            .replace(/(^|[^;]);;(?!;)/g, '$1;')
            .replace(/(^|[^?])\?\?(?!\?)/g, '$1?');
    }
});
