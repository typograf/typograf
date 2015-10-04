/*jshint maxlen:1000 */
Typograf.rule({
    name: 'ru/optalign/bracket',
    handler: function(text, settings) {
        return text
            .replace(/( |\u00A0)\(/g, '<span class="typograf-oa-sp-lbracket">$1</span><span class="typograf-oa-lbracket">(</span>')
            .replace(/^\(/gm, '<span class="typograf-oa-n-lbracket">(</span>');
    },
    disabled: true
})
.innerRule({
    name: 'ru/optalign/bracket',
    handler: function(text) {
        // Зачистка HTML-тегов от висячей пунктуации для скобки
        return text.replace(/<span class="typograf-oa-(n-|sp-)?lbracket">(.*?)<\/span>/g, '$2');
    }
});
