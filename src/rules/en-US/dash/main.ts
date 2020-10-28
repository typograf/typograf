import { Rule } from '../../../types';
import Typograf from '../../../typograf';

const rule: Rule = {
    name: 'en-US/dash/main',
    index: '-5',
    handler(text) {
        const dashes = Typograf.getData('common/dash');
        const nonBreakingSpace = '\u00A0';
        const emDash = '\u2014';
        const spaceBefore = `[ ${nonBreakingSpace}]`; // white space or a non-breaking space
        const spaceAfter = `[ ${nonBreakingSpace}\n]`; // same as spaceBefore, but includes line break
        const re = new RegExp(`${spaceBefore}(${dashes})(${spaceAfter})`, 'g');

        return text.replace(re, `${nonBreakingSpace}${emDash}$2`);
    }
};

export default rule;
