(function() {

    var classNames = [
            'typograf-oa-comma',
            'typograf-oa-comma-sp'
        ],
        name = 'ru/optalign/comma';

    Typograf.addRule({
        name: name,
        handler: function(text) {
            var re = new RegExp('([' + this.getData('char') + '\\d\u0301]+), ', 'gi');
            return text.replace(re, '$1<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>');
        },
        disabled: true
    }).addInnerRule({
        name: name,
        queue: 'start',
        handler: function(text) {
            return Typograf._removeOptAlignTags(text, classNames);
        }
    }).addInnerRule({
        name: name,
        queue: 'end',
        handler: function(text) {
            return Typograf._removeOptAlignTagsFromTitle(text, classNames);
        }
    });

})();
