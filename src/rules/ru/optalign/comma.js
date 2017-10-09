(function() {

    const classNames = [
        'typograf-oa-comma',
        'typograf-oa-comma-sp'
    ];
    const name = 'ru/optalign/comma';

    Typograf.addRule({
        name,
        handler(text, settings, context) {
            const re = new RegExp('([' + context.getData('char') + '\\d\u0301]+), ', 'gi');
            return text.replace(re, '$1<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>');
        },
        disabled: true,
        htmlAttrs: false
    }).addInnerRule({
        name,
        queue: 'start',
        handler(text) {
            return Typograf._removeOptAlignTags(text, classNames);
        }
    }).addInnerRule({
        name,
        queue: 'end',
        handler(text) {
            return Typograf._removeOptAlignTagsFromTitle(text, classNames);
        }
    });

})();
