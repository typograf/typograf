Typograf.rule({
    name: 'common/punctuation/delDoublePunctuation',
    handler: function(text) {
        return text
            .replace(/(^|[^,]),,(?!,)/g, '$1,')
            .replace(/(^|[^:])::(?!:)/g, '$1:')
            .replace(/(^|[^!?\.])\.\.(?!\.)/g, '$1.')
            .replace(/(^|[^;]);;(?!;)/g, '$1;')
            .replace(/(^|[^?])\?\?(?!\?)/g, '$1?');
    }
});
