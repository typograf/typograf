import type { TypografRule } from '../../../main';
import { getData } from '../../../data';
import { privateLabel } from '../../../consts';

const reExclamationMark = new RegExp('!([^).…!;?\\s[\\])' + privateLabel + getData('common/quote') + '])', 'g');

export const afterExclamationMarkRule: TypografRule = {
    name: 'common/space/afterExclamationMark',
    handler(text) {
        return text.replace(reExclamationMark, '! $1');
    },
};
