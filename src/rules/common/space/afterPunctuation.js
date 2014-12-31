Typograf.rule({
    title: 'Пробел после знаков пунктуации', 
    name: 'common/space/afterPunctuation', 
    sortIndex: 560, 
    func: function(text) {
        return text
            .replace(/(!|;|\?)([^ _\n\t!;\?\[])/g, '$1 $2')
            .replace(/(\D)(,|:)([^ _\d\n\t!;,\?\.:])/g, '$1$2 $3');
    }
});
