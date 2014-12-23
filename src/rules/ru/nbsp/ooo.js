Typograf.rule({
    title: 'Неразрывный пробел после OOO, ОАО, ЗАО, НИИ и ПБОЮЛ',
    name: 'ru/nbsp/ooo',
    sortIndex: 1100,
    func: function(text) {
        return text.replace(/(^|[^a-яёA-ЯЁ])(ООО|ОАО|ЗАО|НИИ|ПБОЮЛ) /g, '$1$2\u00A0');
    }
});
