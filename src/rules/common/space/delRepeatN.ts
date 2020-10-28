import { Rule } from '../../../types';
import { repeat } from '../../../helpers/string';

const rule: Rule<{ maxConsecutiveLineBreaks: number; }> = {
    name: 'common/space/delRepeatN',
    index: '-1',
    handler(text, settings) {
        const maxConsecutiveLineBreaks = settings.maxConsecutiveLineBreaks;
        const consecutiveLineBreaksRegex = new RegExp(`\n{${maxConsecutiveLineBreaks + 1},}`, 'g');
        const replaceValue = repeat('\n', maxConsecutiveLineBreaks);

        return text.replace(consecutiveLineBreaksRegex, replaceValue);
    },
    settings: {
        maxConsecutiveLineBreaks: 2
    }
};

export default rule;
