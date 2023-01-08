import type { TypografRule } from '../../../main';
import { privateLabel } from '../../../consts';

const reColon = new RegExp('(\\D):([^)",:.?\\s\\/\\\\' + privateLabel + '])', 'g');

export const afterColonRule: TypografRule = {
    name: 'common/space/afterColon',
    handler(text) {
        return text.replace(reColon, '$1: $2');
    },
};
