Typograf.rule('pasteSpaceAfterPunctuation', 560, function(text) {
    return text.replace(/(\!|;|\?)([^ \n\t\!;\?])/g, '$1 $2').replace(/(\D)(,|\:)([^ \/\d\n\t\!;,\?\.\:])/g, '$1$2 $3');
});
