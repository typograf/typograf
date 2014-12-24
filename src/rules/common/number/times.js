Typograf.rule({
    title: 'x → × (10 x 5 → 10×5)',
    name: 'common/number/times',
    sortIndex: 1050,
    func: function(text) {
        return text.replace(/(\d) ?(x|х) ?(\d)/g, '$1×$3');
    }
});
