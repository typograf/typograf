export const regExpUrl = new RegExp('(https?|file|ftp)://([a-zA-Z0-9/+-=%&:_.~?]+[a-zA-Z0-9#+]*)', 'g');
export const regExpNumber = '\\d+([.,]\\d+)?';
export const regExpDigit = /\d/;

export function isDigit(symbol) {
    return symbol.search(regExpDigit) > -1;
}
