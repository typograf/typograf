import { privateLabel } from '../../../consts';

export default {
    name: 'ru/nbsp/m',
    index: '+5',
    handler(text) {
        const re = new RegExp('(^|[\\s,.\\(' + privateLabel + '])' +
                '(\\d+)[ \u00A0]?(мм?|см|км|дм|гм|mm?|km|cm|dm)([23²³])?([\\s\\).!?,;' +
                privateLabel + ']|$)', 'gm');

        return text.replace(re, function($0, $1, $2, $3, $4, $5) {
            const pow = {
                '2': '²',
                '²': '²',
                '3': '³',
                '³': '³',
                '': ''
            }[$4 || ''];

            return $1 + $2 + '\u00A0' + $3 + pow + ($5 === '\u00A0' ? ' ' : $5);
        });
    }
};
