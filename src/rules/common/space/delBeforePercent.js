Typograf.rule({
    title: 'Удаление пробела перед %, ‰ и ‱',
    name: 'common/space/delBeforePercent',
    sortIndex: 600,
    func: function(text) {
        return text.replace(/(\d)( |\u00A0)(%|‰|‱)/g, '$1$3');
    }
});
