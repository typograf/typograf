import { getData } from '../../../data';
import { privateLabel } from '../../../consts';

export default {
    name: 'common/space/afterPunctuation',
    handler(text) {
        const reExcl = new RegExp('(!|;|\\?)([^).…!;?\\s[\\])' + privateLabel + getData('common/quote') + '])', 'g');
        const reComma = new RegExp('(\\D)(,|:)([^)",:.?\\s\\/\\\\' + privateLabel + '])', 'g');

        return text
            .replace(reExcl, '$1 $2')
            .replace(reComma, '$1$2 $3');
    }
};
