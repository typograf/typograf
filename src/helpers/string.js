export function repeat(symbol, count) {
    let result = '';
    for (; ;) {
        if ((count & 1) === 1) {
            result += symbol;
        }
        count >>>= 1;
        if (count === 0) {
            break;
        }
        symbol += symbol;
    }

    return result;
}

export function replaceNbsp(text) {
    return text.replace(/\u00A0/g, ' ');
}

export function replace(text, re) {
    for (let i = 0; i < re.length; i++) {
        text = text.replace(re[i][0], re[i][1]);
    }

    return text;
}

export function isHTML(text) {
    return text.search(/(<\/?[a-z]|<!|&[lg]t;)/i) !== -1;
}

export function removeCR(text) {
    return text.replace(/\r\n?/g, '\n');
}

export function fixLineEnding(text, type) {
    if (type === 'CRLF') { // Windows
        return text.replace(/\n/g, '\r\n');
    } else if (type === 'CR') { // Mac
        return text.replace(/\n/g, '\r');
    }

    return text;
}
