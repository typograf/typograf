Typograf.rule({
    name: 'ru/nbsp/xxxx',
    index: 1060,
    handler: function(text) {
        return text.replace(/(^|\D)(\d{1,4}) ?г(од| |,|;|\.|\n|$)/g, '$1$2\u00A0г$3');
    }
});
