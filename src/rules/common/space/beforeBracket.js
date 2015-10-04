Typograf.rule({
    name: 'common/space/beforeBracket',
    handler: function(text) {
        var re = new RegExp('([' + this._data('l') + '.!?,;…)])\\(', 'gi');
        return text.replace(re, '$1 (');
    }
});
