/*jshint maxlen:1000 */
Typograf.rule({
    name: 'ru/optalign/comma',
    sortIndex: 1002,
    func: function(text, settings) {
        var re = new RegExp('([' + this.letters() + '\\d\u0301]+), ', 'gi');
        return text.replace(re, '$1<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>');
    },
    disabled: true
})
.innerRule({
    name: 'ru/optalign/comma',
    func: function(text) {
        // Зачистка HTML-тегов от висячей пунктуации для запятой
        return text.replace(/<span class="typograf-oa-(comma|comma-sp)">(.*?)<\/span>/g, '$2');
    }
});
