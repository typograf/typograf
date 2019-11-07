export function removeOptAlignTags(text, classNames) {
    const re = new RegExp('<span class="(' + classNames.join('|') + ')">([^]*?)</span>', 'g');
    return text.replace(re, '$2');
}

export function removeOptAlignTagsFromTitle(text, classNames) {
    return text.replace(/<title>[^]*?<\/title>/i, function(text) {
        return removeOptAlignTags(text, classNames);
    });
}
