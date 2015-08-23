Typograf.rule({
    name: 'common/space/delBeforePercent',
    index: 600,
    handler: function(text) {
        return text.replace(/(\d)( |\u00A0)(%|‰|‱)/g, '$1$3');
    }
});
