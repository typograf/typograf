import type { TypografRule } from '../../../main';
import { getData } from '../../../data';

export const mainRule: TypografRule = {
    name: 'en-US/dash/main',
    index: '-5',
    handler(text) {
        const dashes = getData('common/dash');
        const nonBreakingSpace = '\u00A0';
        const emDash = '\u2014';
        const spaceBefore = `[ ${nonBreakingSpace}]`; // white space or a non-breaking space
        const spaceAfter = `[ ${nonBreakingSpace}\n]`; // same as spaceBefore, but includes line break
        const re = new RegExp(`${spaceBefore}(${dashes})(${spaceAfter})`, 'g');

        return text.replace(re, `${nonBreakingSpace}${emDash}$2`);
    },
};
