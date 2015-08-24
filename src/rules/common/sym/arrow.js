Typograf.rule({
    name: 'common/sym/arrow',
    index: 1130,
    handler: function(text) {
        return text.replace(/(^|[^-])->(?!>)/g, '$1→').replace(/(^|[^<])<-(?!-)/g, '$1←');
    }
});
