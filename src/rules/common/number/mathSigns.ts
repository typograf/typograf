import type { TypografRule } from '../../../main';
import { replace } from '../../../helpers/string';

export const mathSignsRule: TypografRule = {
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
