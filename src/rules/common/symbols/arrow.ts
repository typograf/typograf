import { replace } from '../../../helpers/string';
import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/symbols/arrow',
    handler(text) {
        return replace(text, [
            [/(^|[^-])->(?!>)/g, '$1→'],
            [/(^|[^<])<-(?!-)/g, '$1←']
        ]);
    }
};

export default rule;
