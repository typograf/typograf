import Typograf from '../../../typograf';

export default {
    name: 'common/space/delRepeatN',
    index: '-1',
    handler(text, settings) {
        const maxConsecutiveLineBreaks = settings.maxConsecutiveLineBreaks;
        const consecutiveLineBreaksRegex = new RegExp(`\n{${maxConsecutiveLineBreaks + 1},}`, 'g');
        const replaceValue = Typograf._repeat('\n', maxConsecutiveLineBreaks);

        return text.replace(consecutiveLineBreaksRegex, replaceValue);
    },
    settings: {
        maxConsecutiveLineBreaks: 2
    }
};
