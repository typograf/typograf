import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/space/delBeforePercent',
    handler(text) {
        return text.replace(/(\d)( |\u00A0)(%|‰|‱)/g, '$1$3');
    }
};

export default rule;
