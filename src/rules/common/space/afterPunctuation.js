Typograf.addRule({
    name: 'common/space/afterPunctuation',
    handler(text) {
        const privateLabel = Typograf._privateLabel;
        const reExcl = new RegExp('(!|;|\\?)([^).…!;?\\s[\\])' + privateLabel + Typograf.getData('common/quote') + '])', 'g');
        const reComma = new RegExp('(\\D)(,|:)([^)",:.?\\s\\/\\\\' + privateLabel + '])', 'g');

        return text
            .replace(reExcl, '$1 $2')
            .replace(reComma, '$1$2 $3');
    }
});
