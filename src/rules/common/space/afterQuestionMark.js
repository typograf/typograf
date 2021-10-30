import { getData } from '../../../data';
import { privateLabel } from '../../../consts';

const reQuestionMark = new RegExp('\\?([^).…!;?\\s[\\])' + privateLabel + getData('common/quote') + '])', 'g');

export default {
    name: 'common/space/afterQuestionMark',
    handler(text) {
        return text.replace(reQuestionMark, '? $1');
    }
};
