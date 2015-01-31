Typograf.rule({
    name: 'common/space/afterPunctuation', 
    sortIndex: 560, 
    func: function(text) {
        var re = new RegExp('(!|;|\\?)([^ \uDBFF\n\t!;?' + this.data('common/quot') + '[])', 'g');
        return text
            .replace(re, '$1 $2')
            .replace(/(\D)(,|:)([^ \uDBFF\n\t,.?:])/g, '$1$2 $3');
    }
});
