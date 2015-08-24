Typograf.rule({
    name: 'common/nbsp/afterPara',
    index: 610,
    handler: function(text) {
        return text.replace(/§ ?(\d|I|V|X)/g, '§\u00A0$1');
    }
});
