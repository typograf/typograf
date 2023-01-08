import type { TypografRule } from '../../../main';
import { getData } from '../../../data';
import { privateLabel } from '../../../consts';

const reSemicolon = new RegExp(';([^).…!;?\\s[\\])' + privateLabel + getData('common/quote') + '])', 'g');

export const afterSemicolonRule: TypografRule = {
    name: 'common/space/afterSemicolon',
    handler(text) {
        return text.replace(reSemicolon, '; $1');
    },
};
