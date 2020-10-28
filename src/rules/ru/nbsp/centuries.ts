import { Rule } from '../../../types';
import Typograf from '../../../typograf';

const rule: Rule = {
    name: 'ru/nbsp/centuries',
    handler(text) {
        const dashes = Typograf.getData('common/dash');
        const before = '(^|\\s)([VIX]+)';
        const after = '(?=[,;:?!"‘“»]|$)';
        const re1 = new RegExp(before + '[ \u00A0]?в\\.?' + after, 'gm');
        const re2 = new RegExp(before + '(' + dashes + ')' + '([VIX]+)[ \u00A0]?в\\.?([ \u00A0]?в\\.?)?' + after, 'gm');

        return text
            .replace(re1, '$1$2\u00A0в.')
            .replace(re2, '$1$2$3$4\u00A0вв.');
    }
};

export default rule;
