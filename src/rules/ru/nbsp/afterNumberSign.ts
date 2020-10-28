import { Rule } from '../../../types';

const rule: Rule = {
    name: 'ru/nbsp/afterNumberSign',
    handler(text) {
        // \u2009 - THIN SPACE
        // \u202F - NARROW NO-BREAK SPACE
        return text.replace(/№[ \u00A0\u2009]?(\d|п\/п)/g, '№\u202F$1');
    }
};

export default rule;
