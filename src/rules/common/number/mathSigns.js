import { replace } from '../../../helpers/string';

export default {
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
