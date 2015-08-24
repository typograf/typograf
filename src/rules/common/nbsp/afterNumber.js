Typograf.rule({
    name: 'common/nbsp/afterNumber',
    index: 615,
    handler: function(text) {
        var re = '(^|\\D)(\\d{1,5}) ([' +
            this.letters() +
            ']{2,})';

        return text.replace(new RegExp(re, 'gi'), '$1$2\u00A0$3');
    }
});
