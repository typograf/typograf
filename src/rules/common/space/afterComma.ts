import { DataQuote, DataCommonQuote } from '../../../data';
import type { TypografRule } from '../../../main';
import { privateLabel } from '../../../consts';
import { isDigit } from '../../../helpers/regExp';

export const afterCommaRule: TypografRule = {
    name: 'common/space/afterComma',
    handler(text, settings, context) {
        const quote = context.getData('quote');
        const quotes = typeof quote === 'string' ? quote as DataCommonQuote : (quote as DataQuote).right;
        return text.replace(
            new RegExp('(.),([^)",:.?\\s\\/\\\\' + privateLabel + quotes + '])', 'g'),
            ($0, $1, $2) => isDigit($1) && isDigit($2) ? $0 : $1 + ', ' + $2
        );
    }
};
