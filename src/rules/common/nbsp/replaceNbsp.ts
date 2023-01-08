import type { TypografRule } from '../../../main';
import { replaceNbsp } from '../../../helpers/string';

export const replaceNbspRule: TypografRule = {
    name: 'common/nbsp/replaceNbsp',
    queue: 'utf',
    live: false,
    handler: replaceNbsp,
    disabled: true,
};
