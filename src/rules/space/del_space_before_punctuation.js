Typograf.rule('del_space_before_punctuation', 550, function(text) {
    return text.replace(/ (\!|;|,|\?|\.|\:)/g, '$1')
        .replace(/\( /g, '(')
        .replace(/([^ ])\(/g, '$1 (')
        .replace(/ \)/g, ')')
        .replace(/\)([^\!;,\?\.\:])/g, ') $1');
});
