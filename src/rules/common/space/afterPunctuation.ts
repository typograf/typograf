import { Rule } from '../../../types';
import Typograf from '../../../typograf';
import { privateLabel } from '../../../consts';

const rule: Rule = {
    name: 'common/space/afterPunctuation',
    handler(text) {
        const reExcl = new RegExp('(!|;|\\?)([^).…!;?\\s[\\])' + privateLabel + Typograf.getData('common/quote') + '])', 'g');
        const reComma = new RegExp('(\\D)(,|:)([^)",:.?\\s\\/\\\\' + privateLabel + '])', 'g');

        return text
            .replace(reExcl, '$1 $2')
            .replace(reComma, '$1$2 $3');
    }
};

export default rule;
