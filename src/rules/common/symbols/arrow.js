Typograf.addRule({
    name: 'common/symbols/arrow',
    handler: function(text) {
        return Typograf._replace(text, [
            [/(^|[^-])->(?!>)/g, '$1→'],
            [/(^|[^<])<-(?!-)/g, '$1←']
        ]);
    }
});
