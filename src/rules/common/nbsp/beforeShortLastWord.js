Typograf.rule({
    name: 'common/nbsp/beforeShortLastWord',
    handler: function(text, settings) {
        var re = new RegExp('([' + this.data('ld') + ']) ([' +
                this.data('lL') + ']{1,' + settings.lengthLastWord +
                '}[.!?…])( [' + this.data('L') + ']|$)', 'g');
        return text.replace(re, '$1\u00A0$2$3');
    },
    settings: {
        lengthLastWord: 3
    }
});
