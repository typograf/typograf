Typograf.rule({
    name: 'common/space/beforeBracket',
    handler: function(text) {
        var re = new RegExp('([' + this.data('l') + '.!?,;…)])\\(', 'gi');
        return text.replace(re, '$1 (');
    }
});
