Typograf.rule({
    name: 'common/sym/arrow',
    index: 1130,
    handler: function(text) {
        return Typograf._replace(text, [
            [/(^|[^-])->(?!>)/g, '$1→'],
            [/(^|[^<])<-(?!-)/g, '$1←']
        ]);
    }
});
