Typograf._removeOptAlignTags = function(text, classNames) {
    const re = new RegExp('<span class="(' + classNames.join('|') + ')">([^]*?)</span>', 'g');
    return text.replace(re, '$2');
};

Typograf._removeOptAlignTagsFromTitle = function(text, classNames) {
    return text.replace(/<title>[^]*?<\/title>/i, function(text) {
        return Typograf._removeOptAlignTags(text, classNames);
    });
};
