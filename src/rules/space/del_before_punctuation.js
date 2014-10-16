Typograf.rule({
    title: 'Удаление пробелов перед знаками пунктуации',
    name: 'space:del_before_punctuation',
    sortIndex: 550,
    func: function(text) {
        return text.replace(/ (\!|;|,|\?|\.|\:)/g, '$1')
            .replace(/\( /g, '(')
            .replace(/([^ ])\(/g, '$1 (')
            .replace(/ \)/g, ')')
            .replace(/\)([^\!;,\?\.\:])/g, ') $1');
    }
});
