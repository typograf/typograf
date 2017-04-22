Typograf.addRule({
    name: 'common/other/repeatWord',
    handler: function(text, settings, context) {
        var punc = '[;:,.?! \n' + Typograf.getData('common/quote') + ']';
        var re = new RegExp('(' + punc + '|^)' + 
            '([' + context.getData('char') + ']{' + settings.min + ',}) ' + 
            '\\2(' + punc + '|$)', 'gi');

        return text.replace(re, '$1$2$3');
    },
    settings: {min: 2},
    disabled: true
});
