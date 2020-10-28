import { Rule } from '../../../types';
import { replaceNbsp } from '../../../helpers/string';

const rule: Rule = {
    name: 'common/nbsp/replaceNbsp',
    queue: 'utf',
    live: false,
    handler: replaceNbsp,
    disabled: true
};

export default rule;
