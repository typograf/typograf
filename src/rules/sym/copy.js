Typograf.rule({
    title: '(c) → ©, (tm) → ©, (r) → ™',
    name: 'sym:copy',
    sortIndex: 10,
    func: function(text) {
        return text.replace(/\(r\)/gi, '®')
            .replace(/\((c|с)\)/gi, '©')
            .replace(/\(tm\)/gi, '™');
    }
});
