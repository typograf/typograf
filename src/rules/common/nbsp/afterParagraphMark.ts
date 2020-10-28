import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/nbsp/afterParagraphMark',
    handler(text) {
        return text.replace(/¶ ?(?=\d)/g, '¶\u00A0');
    }
};

export default rule;
