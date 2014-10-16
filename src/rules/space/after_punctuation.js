Typograf.rule({
    title: 'Пробел после знаков пунктуации', 
    name: 'space:after_punctuation', 
    sortIndex: 560, 
    func: function(text) {
        return text
            .replace(/(\!|;|\?)([^ \n\t\!;\?])/g, '$1 $2')
            .replace(/(\D)(,|\:)([^ \/\d\n\t\!;,\?\.\:])/g, '$1$2 $3');
    }
});
