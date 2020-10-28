import { Rule } from '../../../types';
import { replace } from '../../../helpers/string';

const rule: Rule = {
    name: 'common/number/mathSigns',
    handler(text) {
        return replace(text, [
            [/!=/g, '≠'],
            [/<=/g, '≤'],
            [/(^|[^=])>=/g, '$1≥'],
            [/<=>/g, '⇔'],
            [/<</g, '≪'],
            [/>>/g, '≫'],
            [/~=/g, '≅'],
            [/(^|[^+])\+-/g, '$1±']
        ]);
    }
};

export default rule;
