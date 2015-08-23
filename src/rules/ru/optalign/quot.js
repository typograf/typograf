/*jshint maxlen:1000 */
Typograf.rule({
    name: 'ru/optalign/quot',
    index: 1000,
    handler: function(text) {
        var lquotes = '(["' +
                this.setting('ru/punctuation/quot', 'lquot') +
                this.setting('ru/punctuation/quot', 'lquot2') +
                '])',
            re = new RegExp('([\\d' + this.letters() + '\\-\u0301!?.:;,]+)( |\u00A0)(' + lquotes + ')', 'gi'),
            re2 = new RegExp('(^|\n|' + Typograf._privateLabel + ')' + lquotes, 'g');

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
        return text.replace(/<span class="typograf-oa-(sp-lquot|lquot|n-lquot)">(.*?)<\/span>/g, '$2');
    }
});
