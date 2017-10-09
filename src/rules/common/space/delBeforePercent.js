Typograf.addRule({
    name: 'common/space/delBeforePercent',
    handler(text) {
        return text.replace(/(\d)( |\u00A0)(%|‰|‱)/g, '$1$3');
    }
});
