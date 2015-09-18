Typograf.rule({
    name: 'common/nbsp/afterShortWord',
    index: 590,
    handler: function(text, settings) {
        var len = settings.lengthShortWord,
            before = ' \u00A0(' + Typograf._privateLabel + Typograf.data('common/quot'),
            subStr = '(^|[' + before + '])([' + this.letters() + ']{1,' + len + '}) ',
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
