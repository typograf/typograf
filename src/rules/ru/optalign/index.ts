import Typograf from '../../../typograf';

import { bracket, innerStartBracket, innerEndBracket } from './bracket';
import { comma, innerStartComma, innerEndComma } from './comma';
import { quote, innerStartQuote, innerEndQuote } from './quote';

Typograf.addRules([
    bracket,
    comma,
    quote
]);

Typograf.addInnerRules([
    innerStartBracket,
    innerEndBracket,

    innerStartComma,
    innerEndComma,

    innerStartQuote,
    innerEndQuote
]);
