import Typograf from '../../../typograf';

import afterNumber from './afterNumber';
import afterParagraphMark from './afterParagraphMark';
import afterSectionMark from './afterSectionMark';
import afterShortWord from './afterShortWord';
import beforeShortLastNumber from './beforeShortLastNumber';
import beforeShortLastWord from './beforeShortLastWord';
import dpi from './dpi';
import nowrap from './nowrap';
import replaceNbsp from './replaceNbsp';

Typograf.addRules([
    afterNumber,
    afterParagraphMark,
    afterSectionMark,
    afterShortWord,
    beforeShortLastNumber,
    beforeShortLastWord,
    dpi,
    nowrap,
    replaceNbsp
]);
