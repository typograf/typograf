/*jshint maxlen:1000 */
Typograf.rule({
    title: 'Висячая пунктуация для открывающей кавычки',
    name: 'ru/optalign/quot',
    sortIndex: 1000,
    func: function(text, settings) {
        var quotes = '(' + this.setting('ru/quot', 'lquot') + '|' + this.setting('ru/quot', 'lquot2') + ')',
            re = new RegExp('([a-zа-яё\\-]{3,})( |\u00A0)(' + quotes + ')', 'gi'),
            re2 = new RegExp('(^|\n|<p> *)' + quotes, 'g');

        return text
            .replace(re, '$1<span class="typograf-oa-sp-lquot">$2</span><span class="typograf-oa-lquot">$3</span>')
            .replace(re2, '$1<span class="typograf-oa-n-lquot">$2</span>');
    },
    enabled: false
})
.rule({
    name: '-ru/optalign/quot',
    sortIndex: -10,
    func: function(text) {
        // Зачистка HTML-тегов от висячей пунктуации для кавычки
        if(this.enabled('ru/optalign/quot')) {
            return text.replace(/<span class="typograf-oa-(sp-lquot|lquot|n-lquot)">(.*?)<\/span>/g, '$2');
        } else {
            return text;
        }
    }
});
