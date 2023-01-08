import { Typograf } from '../../../main';
import { apostropheRule } from './apostrophe';
import { delDoublePunctuationRule } from './delDoublePunctuation';
import { hellipRule } from './hellip';
import { quoteRule } from './quote';
import { quoteLinkRule } from './quoteLink';

Typograf.addRules([
    apostropheRule,
    delDoublePunctuationRule,
    hellipRule,
    quoteRule,
    quoteLinkRule,
]);
