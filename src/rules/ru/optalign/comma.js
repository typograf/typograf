/*jshint maxlen:1000 */
Typograf.rule({
    title: 'Висячая типографика для запятой',
    name: 'ru/optalign/comma',
    sortIndex: 1002,
    func: function(text, settings) {
        return text.replace(/([а-яёa-z0-9]+)\, /gi, '$1<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>');
    },
    enabled: false
})
.rule({
    name: '-ru/optalign/comma',
    sortIndex: -10,
    func: function(text) {
        // Зачистка HTML-тегов от висячей пунктуации для запятой
        if(this.enabled('ru/optalign/comma')) {
            return text.replace(/<span class="typograf-oa-(comma|comma-sp)">(.*?)<\/span>/g, '$2');
        } else {
            return text;
        }
    }
});
