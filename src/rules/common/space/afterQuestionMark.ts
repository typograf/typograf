import type { TypografRule } from '../../../main';
import { getData } from '../../../data';
import { privateLabel } from '../../../consts';

const reQuestionMark = new RegExp('\\?([^).…!;?\\s[\\])' + privateLabel + getData('common/quote') + '])', 'g');

export const afterQuestionMarkRule: TypografRule = {
    name: 'common/space/afterQuestionMark',
    handler(text) {
        return text.replace(reQuestionMark, '? $1');
    },
};
