import { Rule } from '../../../types';
import { privateLabel } from '../../../consts';

const rule: Rule = {
    name: 'ru/nbsp/m',
    index: '+5',
    handler(text) {
        const re = new RegExp('(^|[\\s,.\\(' + privateLabel + '])' +
                '(\\d+)[ \u00A0]?(мм?|см|км|дм|гм|mm?|km|cm|dm)([23²³])?([\\s\\).!?,;' +
                privateLabel + ']|$)', 'gm');

        return text.replace(re, ($0, $1: string, $2: string, $3: string, $4: string, $5: string) => {
            const hash: Record<string, string> = {
                '2': '²',
                '²': '²',
                '3': '³',
                '³': '³',
                '': ''
            };

            const pow = hash[$4 || ''];

            return $1 + $2 + '\u00A0' + $3 + pow + ($5 === '\u00A0' ? ' ' : $5);
        });
    }
};

export default rule;
