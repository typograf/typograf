Typograf.rule({
    name: 'ru/nbsp/year',
    handler: function(text) {
        return text.replace(/(^|\D)(\d{4}) ?г([ ,;.\n]|$)/g, '$1$2\u00A0г$3');
    }
});
