import { Rule } from '../../../types';
import { privateLabel } from '../../../consts';

const rule: Rule = {
    name: 'ru/nbsp/ps',
    handler(text) {
        const re = new RegExp(`(^|\\s|${privateLabel})[pз]\\.[ \u00A0]?([pз]\\.[ \u00A0]?)?[sы]\\.:? `, 'gim');

        return text.replace(re, ($0, $1: string, $2: string) => {
            return $1 + ($2 ? 'P.\u00A0P.\u00A0S. ' : 'P.\u00A0S. ');
        });
    }
};

export default rule;
