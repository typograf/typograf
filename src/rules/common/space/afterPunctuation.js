Typograf.addRule({
    name: 'common/space/afterPunctuation',
    handler: function(text) {
        var privateLabel = Typograf._privateLabel,
            reExcl = new RegExp('(!|;|\\?)([^).!;?\\s[\\])' + privateLabel + this.getData('common/quote') + '])', 'g'),
            reComma = new RegExp('(\\D)(,|:)([^)",:.?\\s\\/\\\\' + privateLabel + '])', 'g');

        return text
            .replace(reExcl, '$1 $2')
            .replace(reComma, '$1$2 $3');
    }
});
