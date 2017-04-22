Typograf.addRule({
    name: 'common/space/beforeBracket',
    handler: function(text, settings, context) {
        var re = new RegExp('([' + context.getData('char') + '.!?,;…)])\\(', 'gi');
        return text.replace(re, '$1 (');
    }
});
