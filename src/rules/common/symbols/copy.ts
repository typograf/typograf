import { Rule } from '../../../types';
import { replace } from '../../../helpers/string';

const rule: Rule = {
    name: 'common/symbols/copy',
    handler(text) {
        return replace(text, [
            [/\(r\)/gi, '®'],
            [/(copyright )?\((c|с)\)/gi, '©'],
            [/\(tm\)/gi, '™']
        ]);
    }
};

export default rule;
