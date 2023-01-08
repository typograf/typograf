import type { TypografRule } from '../../../main';
import { replace } from '../../../helpers/string';

export const copyRule: TypografRule = {
    name: 'common/symbols/copy',
    handler(text) {
        return replace(text, [
            [/\(r\)/gi, '®'],
            [/(copyright )?\((c|с)\)/gi, '©'],
            [/\(tm\)/gi, '™']
        ]);
    },
};
