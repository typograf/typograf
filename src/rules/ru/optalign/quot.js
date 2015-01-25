/*jshint maxlen:1000 */
Typograf.rule({
    name: 'ru/optalign/quot',
    sortIndex: 1000,
    func: function(text) {
        var lquotes = '(["' +
                this.setting('ru/punctuation/quot', 'lquot') +
                this.setting('ru/punctuation/quot', 'lquot2') +
                '])',
            re = new RegExp('([' + this.letters() + '\\-\u0301!?.:;,]+)( |\u00A0)(' + lquotes + ')', 'gi'),
            re2 = new RegExp('(^|\n|\uDBFF)' + lquotes, 'g'); // \uDBFF - часть внутренней метки HTML-тега

        return text
            .replace(re, '$1<span class="typograf-oa-sp-lquot">$2</span><span class="typograf-oa-lquot">$3</span>')
            .replace(re2, '$1<span class="typograf-oa-n-lquot">$2</span>');
    },
    enabled: false
})
.innerRule({
    name: 'ru/optalign/quot',
    func: function(text) {
        // Зачистка HTML-тегов от висячей пунктуации для кавычки
        return text.replace(/<span class="typograf-oa-(sp-lquot|lquot|n-lquot)">(.*?)<\/span>/g, '$2');
    }
});
