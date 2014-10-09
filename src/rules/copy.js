Typograf.rule('copy', 10, function(text) {
    return text.replace(/\(r\)/gi, '®')
        .replace(/\((c|с)\)/gi, '©')
        .replace(/\(tm\)/gi, '™')
        .replace(/\+\/\-/gi, '±');
});
