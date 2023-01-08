import { Typograf } from '../../../main';

import { beforeBracketRule } from './beforeBracket';
import { bracketRule } from './bracket';
import { delBeforePercentRule } from './delBeforePercent';
import { delBeforePunctuationRule } from './delBeforePunctuation';
import { delBetweenExclamationMarksRule } from './delBetweenExclamationMarks';
import { delBeforeDotRule } from './delBeforeDot';
import { delLeadingBlanksRule } from './delLeadingBlanks';
import { delRepeatNRule } from './delRepeatN';
import { delRepeatSpaceRule } from './delRepeatSpace';
import { delTrailingBlanksRule } from './delTrailingBlanks';
import { insertFinalNewlineRule } from './insertFinalNewline';
import { replaceTabRule } from './replaceTab';
import { squareBracketRule } from './squareBracket';
import { trimLeftRule } from './trimLeft';
import { trimRightRule } from './trimRight';
import { afterColonRule } from './afterColon';
import { afterCommaRule } from './afterComma';
import { afterQuestionMarkRule } from './afterQuestionMark';
import { afterExclamationMarkRule }  from './afterExclamationMark';
import { afterSemicolonRule } from './afterSemicolon';

Typograf.addRules([
    afterColonRule,
    afterCommaRule,
    afterQuestionMarkRule,
    afterExclamationMarkRule,
    afterSemicolonRule,
    beforeBracketRule,
    bracketRule,
    delBeforeDotRule,
    delBeforePercentRule,
    delBeforePunctuationRule,
    delBetweenExclamationMarksRule,
    delLeadingBlanksRule,
    delRepeatNRule,
    delRepeatSpaceRule,
    delTrailingBlanksRule,
    insertFinalNewlineRule,
    replaceTabRule,
    squareBracketRule,
    trimLeftRule,
    trimRightRule,
]);
