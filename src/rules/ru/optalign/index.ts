import { Typograf } from '../../../main';

import { bracketRule, innerStartBracketRule, innerEndBracketRule } from './bracket';
import { commaRule, innerStartCommaRule, innerEndCommaRule } from './comma';
import { quoteRule, innerStartQuoteRule, innerEndQuoteRule } from './quote';

Typograf.addRules([
    bracketRule,
    commaRule,
    quoteRule,
]);

Typograf.addInnerRules([
    innerStartBracketRule,
    innerEndBracketRule,

    innerStartCommaRule,
    innerEndCommaRule,

    innerStartQuoteRule,
    innerEndQuoteRule,
]);
