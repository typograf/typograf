Typograf.addRule({
    name: 'common/number/times',
    handler: function(text) {
        return text.replace(/(\d)[ \u00A0]?[xх][ \u00A0]?(\d)/g, '$1×$2');
    }
});
