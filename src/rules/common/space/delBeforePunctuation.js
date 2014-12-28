Typograf.rule({
    title: 'Удаление пробелов перед знаками пунктуации',
    name: 'common/space/delBeforePunctuation',
    sortIndex: 550,
    func: function(text) {
        return text.replace(/ (!|;|,|\?|\.|:)/g, '$1')
            .replace(/\( /g, '(')
            .replace(/([^ ])\(/g, '$1 (')
            .replace(/ \)/g, ')')
            .replace(/\)([^!;,\?\.:])/g, ') $1');
    }
});
