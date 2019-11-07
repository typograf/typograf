import Typograf from '../../../typograf';

import afterPunctuation from './afterPunctuation';
import beforeBracket from './beforeBracket';
import bracket from './bracket';
import delBeforePercent from './delBeforePercent';
import delBeforePunctuation from './delBeforePunctuation';
import delLeadingBlanks from './delLeadingBlanks';
import delRepeatN from './delRepeatN';
import delRepeatSpace from './delRepeatSpace';
import delTrailingBlanks from './delTrailingBlanks';
import insertFinalNewline from './insertFinalNewline';
import replaceTab from './replaceTab';
import squareBracket from './squareBracket';
import trimLeft from './trimLeft';
import trimRight from './trimRight';

Typograf.addRules([
    afterPunctuation,
    beforeBracket,
    bracket,
    delBeforePercent,
    delBeforePunctuation,
    delLeadingBlanks,
    delRepeatN,
    delRepeatSpace,
    delTrailingBlanks,
    insertFinalNewline,
    replaceTab,
    squareBracket,
    trimLeft,
    trimRight
]);
