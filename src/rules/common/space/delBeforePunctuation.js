Typograf.rule({
    name: 'common/space/delBeforePunctuation',
    index: 550,
    handler: function(text) {
        return text.replace(/ (!|;|,|\?|\.|:)/g, '$1')
            .replace(/\( +/g, '(')
            .replace(/([^ \u00A0])\(/g, '$1 (')
            .replace(/ \)/g, ')')
            .replace(/\)([^!;,\?\.:])/g, ') $1');
    }
});
