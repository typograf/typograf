/*jshint maxlen:1000 */
Typograf.rule({
    name: 'ru/optalign/quot',
    index: 1000,
    handler: function(text) {
        var name = 'ru/punctuation/quot',
            lquotes = '(["' +
                this.setting(name, 'lquot') +
                this.setting(name, 'lquot2') +
                this.setting(name, 'lquot3') +
                '])',
            re = new RegExp('([\\d' + this.letters() + '\\-\u0301!?.:;,]+)( |\u00A0)(' + lquotes + ')', 'gi'),
            re2 = new RegExp('(^|' + Typograf._privateLabel + ')' + lquotes, 'gm');

        return text
            .replace(re, '$1<span class="typograf-oa-sp-lquot">$2</span><span class="typograf-oa-lquot">$3</span>')
            .replace(re2, '$1<span class="typograf-oa-n-lquot">$2</span>');
    },
    disabled: true
})
.innerRule({
    name: 'ru/optalign/quot',
    handler: function(text) {
        // Зачистка HTML-тегов от висячей пунктуации для кавычки
        return text.replace(/<span class="typograf-oa-(n-|sp-)?lquot">(.*?)<\/span>/g, '$2');
    }
});
