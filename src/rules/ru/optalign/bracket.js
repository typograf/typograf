/*jshint maxlen:1000 */
Typograf.rule({
    name: 'ru/optalign/bracket',
    sortIndex: 1001,
    func: function(text, settings) {
        return text
            .replace(/( |\u00A0)\(/g, '<span class="typograf-oa-sp-lbracket">$1</span><span class="typograf-oa-lbracket">(</span>')
            .replace(/(^|\n)\(/g, '$1<span class="typograf-oa-n-lbracket">(</span>');
    },
    disabled: true
})
.innerRule({
    name: 'ru/optalign/bracket',
    func: function(text) {
        // Зачистка HTML-тегов от висячей пунктуации для скобки
        return text.replace(/<span class="typograf-oa-(sp-lbracket|lbracket|n-lbracket)">(.*?)<\/span>/g, '$2');
    }
});
