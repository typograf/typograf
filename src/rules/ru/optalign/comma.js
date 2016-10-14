(function() {

var classNames = [
        'typograf-oa-comma',
        'typograf-oa-comma-sp'
    ],
    name = 'ru/optalign/comma';

Typograf.rule({
    name: name,
    handler: function(text) {
        var re = new RegExp('([' + this.data('l') + '\\d\u0301]+), ', 'gi');
        return text.replace(re, '$1<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>');
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
