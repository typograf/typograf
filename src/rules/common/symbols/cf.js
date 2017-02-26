Typograf.addRule({
    name: 'common/symbols/cf',
    handler: function(text) {
        var re = new RegExp('(^|[^%])(\\d+)( |\u00A0)?(C|F)([\\W \\.,:!\\?"\\]\\)]|$)', 'g');

        return text.replace(re, '$1$2' + '\u2009' + '°$4$5');
    }
});
