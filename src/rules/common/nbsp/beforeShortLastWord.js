Typograf.addRule({
    name: 'common/nbsp/beforeShortLastWord',
    handler: function(text, settings) {
        var ch = this.getData('char'),
            CH = ch.toUpperCase(),
            re = new RegExp('([' + ch + '\\d]) ([' +
                ch + CH + ']{1,' + settings.lengthLastWord +
                '}[.!?…])( [' + CH + ']|$)', 'g');
        return text.replace(re, '$1\u00A0$2$3');
    },
    settings: {
        lengthLastWord: 3
    }
});
