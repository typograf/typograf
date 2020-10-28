import { Rule } from '../../../types';

const rule: Rule = {
    name: 'ru/number/comma',
    handler(text) {
        // \u00A0 - NO-BREAK SPACE
        // \u2009 - THIN SPACE
        // \u202F - NARROW NO-BREAK SPACE
        return text.replace(/(^|\s)(\d+)\.(\d+[\u00A0\u2009\u202F ]*?[%‰°×x])/gim, '$1$2,$3');
    }
};

export default rule;
