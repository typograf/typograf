import { Rule } from '../../../types';
import Typograf from '../../../typograf';

const rule: Rule<{ dash: string }> = {
    name: 'ru/dash/years',
    handler(text, settings) {
        const dashes = Typograf.getData('common/dash');
        const re = new RegExp('(\\D|^)(\\d{4})[ \u00A0]?(' +
                dashes + ')[ \u00A0]?(\\d{4})(?=[ \u00A0]?г)', 'g');

        return text.replace(re, ($0, $1, $2, $3, $4) => {
            if (parseInt($2, 10) < parseInt($4, 10)) {
                return $1 + $2 + settings.dash + $4;
            }

            return $0;
        });
    },
    settings: {
        dash: '\u2013' // &ndash;
    }
};

export default rule;
