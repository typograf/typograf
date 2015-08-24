Typograf.rule({
    name: 'ru/date/main',
    index: 1300,
    handler: function(text) {
        var sp1 = '(-|\\.|\\/)',
            sp2 = '(-|\\/)',
            re1 = new RegExp('(^|\\D)(\\d{4})' + sp1 + '(\\d{2})' + sp1 + '(\\d{2})(\\D|$)', 'gi'),
            re2 = new RegExp('(^|\\D)(\\d{2})' + sp2 + '(\\d{2})' + sp2 + '(\\d{4})(\\D|$)', 'gi');
            
        return text
            .replace(re1, '$1$6.$4.$2$7')
            .replace(re2, '$1$4.$2.$6$7');
    }
});
