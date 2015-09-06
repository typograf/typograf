Typograf.rule({
    name: 'common/number/times',
    index: 1050,
    handler: function(text) {
        return text.replace(/(\d)[ \u00A0]?(x|х)[ \u00A0]?(\d)/g, '$1×$3');
    }
});
