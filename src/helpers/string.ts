import { LineEnding } from '../types';

export function repeat(symbol: string, count: number): string {
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

export function replaceNbsp(text: string): string {
    return text.replace(/\u00A0/g, ' ');
}

export function replace(text: string, re: [RegExp, string][]): string {
    for (let i = 0; i < re.length; i++) {
        text = text.replace(re[i][0], re[i][1]);
    }

    return text;
}

export function isHTML(text: string): boolean {
    return text.search(/(<\/?[a-z]|<!|&[lg]t;)/i) !== -1;
}

export function removeCR(text: string): string {
    return text.replace(/\r\n?/g, '\n');
}

export function fixLineEnding(text: string, type?: LineEnding): string {
    if (type === 'CRLF') { // Windows
        return text.replace(/\n/g, '\r\n');
    } else if (type === 'CR') { // Mac
        return text.replace(/\n/g, '\r');
    }

    return text;
}
