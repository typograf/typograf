import type { TypografRule } from '../../../main';
import { replace } from '../../../helpers/string';

export const arrowRule: TypografRule = {
    name: 'common/symbols/arrow',
    handler(text) {
        return replace(text, [
            [/(^|[^-])->(?!>)/g, '$1→'],
            [/(^|[^<])<-(?!-)/g, '$1←']
        ]);
    },
};
