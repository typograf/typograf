Typograf.addRule({
    name: 'common/punctuation/hellip',
    handler(text, settings, context) {
        return context.prefs.locale[0] === 'ru' ?
            text.replace(/(^|[^.])\.{3,4}(?=[^.]|$)/g, '$1…') :
            text.replace(/(^|[^.])\.{3}(\.?)(?=[^.]|$)/g, '$1…$2');
    }
});
