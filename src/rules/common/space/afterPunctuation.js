Typograf.rule({
    name: 'common/space/afterPunctuation', 
    sortIndex: 560, 
    func: function(text) {
        return text
            .replace(/(!|;|\?)([^ \uDBFF\n\t!;?[])/g, '$1 $2')
            .replace(/(\D)(,|:)([^ \uDBFF\n\t,.?:])/g, '$1$2 $3');
    }
});
