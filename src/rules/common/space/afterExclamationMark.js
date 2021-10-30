import { getData } from '../../../data';
import { privateLabel } from '../../../consts';

const reExclamationMark = new RegExp('!([^).…!;?\\s[\\])' + privateLabel + getData('common/quote') + '])', 'g');

export default {
    name: 'common/space/afterExclamationMark',
    handler(text) {
        return text.replace(reExclamationMark, '! $1');
    }
};
