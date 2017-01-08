Typograf.addRule({
    name: 'common/nbsp/afterShortWord',
    handler: function(text, settings) {
        var len = settings.lengthShortWord,
            before = ' \u00A0(' + Typograf._privateLabel + this.getData('common/quote'),
            subStr = '(^|[' + before + '])([' + this.getData('char') + ']{1,' + len + '}) ',
            newSubStr = '$1$2\u00A0',
            re = new RegExp(subStr, 'gim');

        return text
            .replace(re, newSubStr)
            .replace(re, newSubStr);
    },
    settings: {
        lengthShortWord: 2
    }
});
