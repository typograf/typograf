export function removeOptAlignTags(text: string, classNames: string[]): string {
    const re = new RegExp('<span class="(' + classNames.join('|') + ')">([^]*?)</span>', 'g');

    return text.replace(re, '$2');
}

export function removeOptAlignTagsFromTitle(text: string, classNames: string[]): string {
    return text.replace(/<title>[^]*?<\/title>/i, (text: string) => {
        return removeOptAlignTags(text, classNames);
    });
}
