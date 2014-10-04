// ООО и ОАО
Typograf.rule('ooo', 1100, function(text) {
    return text.replace(/(ООО|ОАО) /g, '$1\u00A0');
});
