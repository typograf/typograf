(function() {

var classNames = [
        'typograf-oa-lbracket',
        'typograf-oa-n-lbracket',
        'typograf-oa-sp-lbracket'
    ],
    name = 'ru/optalign/bracket';

Typograf.rule({
    name: name,
    handler: function(text) {
        return text
            .replace(/( |\u00A0)\(/g, '<span class="typograf-oa-sp-lbracket">$1</span><span class="typograf-oa-lbracket">(</span>')
            .replace(/^\(/gm, '<span class="typograf-oa-n-lbracket">(</span>');
    },
    disabled: true
}).innerRule({
    name: name,
    queue: 'start',
    handler: function(text) {
        return Typograf._removeOptAlignTags(text, classNames);
    }
}).innerRule({
    name: name,
    queue: 'end',
    handler: function(text) {
        return Typograf._removeOptAlignTagsFromTitle(text, classNames);
    }
});

})();
