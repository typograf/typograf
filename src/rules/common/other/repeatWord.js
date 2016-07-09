Typograf.rule({
    name: 'common/other/repeatWord',
    handler: function(text, settings) {
        var punc = '[;:,.?! \n' + this.data('common/quote') + ']';
        var re = new RegExp('(' + punc + '|^)' + 
            '([' + this.data('l') + ']{' + settings.min + ',}) ' + 
            '\\2(' + punc + '|$)', 'gi');

        return text.replace(re, '$1$2$3');
    },
    settings: {min: 2},
    disabled: true
});
