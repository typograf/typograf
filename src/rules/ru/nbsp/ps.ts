import type { TypografRule } from '../../../main';
import { privateLabel } from '../../../consts';

export const psRule: TypografRule = {
    name: 'ru/nbsp/ps',
    handler(text) {
        const re = new RegExp(`(^|\\s|${privateLabel})[pз]\\.[ \u00A0]?([pз]\\.[ \u00A0]?)?[sы]\\.:? `, 'gim');

        return text.replace(re, function($0, $1, $2) {
            return $1 + ($2 ? 'P.\u00A0P.\u00A0S. ' : 'P.\u00A0S. ');
        });
    },
};
