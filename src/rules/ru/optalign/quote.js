/*jshint maxlen:1000 */
Typograf.rule({
    name: 'ru/optalign/quote',
    handler: function(text) {
        var name = 'ru/punctuation/quote',
            lquotes = '(["' +
                this.setting(name, 'lquote') +
                this.setting(name, 'lquote2') +
                this.setting(name, 'lquote3') +
                '])',
            re = new RegExp('([\\d' + this.data('l') + '\\-\u0301!?.:;,]+)( |\u00A0)(' + lquotes + ')', 'gi'),
            re2 = new RegExp('(^|' + Typograf._privateLabel + ')' + lquotes, 'gm');

        return text
            .replace(re, '$1<span class="typograf-oa-sp-lquote">$2</span><span class="typograf-oa-lquote">$3</span>')
            .replace(re2, '$1<span class="typograf-oa-n-lquote">$2</span>');
    },
    disabled: true
})
.innerRule({
    name: 'ru/optalign/quote',
    handler: function(text) {
        // Зачистка HTML-тегов от висячей пунктуации для кавычки
        return text.replace(/<span class="typograf-oa-(n-|sp-)?lquote">(.*?)<\/span>/g, '$2');
    }
});
