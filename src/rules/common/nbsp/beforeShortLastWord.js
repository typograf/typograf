Typograf.rule({
    name: 'common/nbsp/beforeShortLastWord',
    handler: function(text, settings) {
        var re = new RegExp('([' + this._data('l') + '\d]) ([' +
                this._data('lL') + ']{1,' + settings.lengthLastWord +
                '}[.!?])( [' + this._data('L') + ']|$)', 'g');
        return text.replace(re, '$1\u00A0$2$3');
    },
    settings: {
        lengthLastWord: 3
    }
});
