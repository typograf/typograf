Typograf.addRule({
    name: 'ru/nbsp/year',
    handler(text) {
        return text.replace(/(^|\D)(\d{4}) ?г([ ,;.\n]|$)/g, '$1$2\u00A0г$3');
    }
});
