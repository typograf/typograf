(function() {

    const classNames = [
        'typograf-oa-lbracket',
        'typograf-oa-n-lbracket',
        'typograf-oa-sp-lbracket'
    ];
    const name = 'ru/optalign/bracket';

    Typograf.addRule({
        name,
        handler(text) {
            return text
                .replace(/( |\u00A0)\(/g, '<span class="typograf-oa-sp-lbracket">$1</span><span class="typograf-oa-lbracket">(</span>')
                .replace(/^\(/gm, '<span class="typograf-oa-n-lbracket">(</span>');
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
