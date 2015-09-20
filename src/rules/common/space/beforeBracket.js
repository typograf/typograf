Typograf.rule({
    name: 'common/space/beforeBracket',
    index: 560,
    handler: function(text) {
        var re = new RegExp('([' + this.letters() + '.!?,;…)])\\(', 'gi');
        return text.replace(re, '$1 (');
    }
});
