import type { TypografRule } from '../../../main';
import { repeat } from '../../../helpers/string';

export const delRepeatNRule: TypografRule<{ maxConsecutiveLineBreaks: number; }> = {
    name: 'common/space/delRepeatN',
    index: '-1',
    handler(text, settings) {
        const maxConsecutiveLineBreaks = settings.maxConsecutiveLineBreaks;
        const consecutiveLineBreaksRegex = new RegExp(`\n{${maxConsecutiveLineBreaks + 1},}`, 'g');
        const replaceValue = repeat('\n', maxConsecutiveLineBreaks);

        return text.replace(consecutiveLineBreaksRegex, replaceValue);
    },
    settings: {
        maxConsecutiveLineBreaks: 2,
    },
};
