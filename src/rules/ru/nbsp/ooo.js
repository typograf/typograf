Typograf.rule({
    name: 'ru/nbsp/ooo',
    index: 1100,
    handler: function(text) {
        return text.replace(/(^|[^a-яёA-ЯЁ])(ООО|ОАО|ЗАО|НИИ|ПБОЮЛ) /g, '$1$2\u00A0');
    }
});
