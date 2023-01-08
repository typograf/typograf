import type { TypografRule } from '../../../main';
import { privateLabel } from '../../../consts';

const pow: Record<string, string> = {
    '2': '²',
    '²': '²',
    '3': '³',
    '³': '³',
    '': ''
};

export const mRule: TypografRule = {
    name: 'ru/nbsp/m',
    index: '+5',
    handler(text) {
        const re = new RegExp('(^|[\\s,.\\(' + privateLabel + '])' +
                '(\\d+)[ \u00A0]?(мм?|см|км|дм|гм|mm?|km|cm|dm)([23²³])?([\\s\\).!?,;' +
                privateLabel + ']|$)', 'gm');

        return text.replace(re, function(_$0, $1, $2, $3, $4, $5) {
            return $1 + $2 + '\u00A0' + $3 + pow[$4 || ''] + ($5 === '\u00A0' ? ' ' : $5);
        });
    },
};
