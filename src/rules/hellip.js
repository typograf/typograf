// Замена 3 точек на троеточие
Typograf.rule('hellip', 20, function(text) {
    return text.replace(/(^|[^.])\.{3}([^.]|$)/g, '$1…$2');
});
