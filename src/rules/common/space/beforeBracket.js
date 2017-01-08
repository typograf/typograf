Typograf.addRule({
    name: 'common/space/beforeBracket',
    handler: function(text) {
        var re = new RegExp('([' + this.getData('char') + '.!?,;…)])\\(', 'gi');
        return text.replace(re, '$1 (');
    }
});
