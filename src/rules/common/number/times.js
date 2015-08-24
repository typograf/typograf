Typograf.rule({
    name: 'common/number/times',
    index: 1050,
    handler: function(text) {
        return text.replace(/(\d) ?(x|х) ?(\d)/g, '$1×$3');
    }
});
