import { Rule } from '../../../types';
import { regExpNumber } from '../../../helpers/regExp';

const rule: Rule =  {
    name: 'ru/money/currency',
    handler(text) {
        const currency = '([$€¥Ұ£₤₽])';
        const space = '[ \u00A0\u2009\u202F]';
        const re1 = new RegExp('(^|[\\D]{2})' + currency + ' ?(' + regExpNumber + '(' + space + '\\d{3})*)(' + space + '?(тыс\\.|млн|млрд|трлн))?', 'gm');
        const re2 = new RegExp('(^|[\\D])(' + regExpNumber + ') ?' + currency, 'gm');

        return text
            .replace(re1, ($0, $1, $2, $3, $4, $5, $6, $7) => {
                return $1 + $3 + ($7 ? '\u00A0' + $7 : '') + '\u00A0' + $2;
            })
            .replace(re2, '$1$2\u00A0$4');
    },
    disabled: true
};

export default rule;
