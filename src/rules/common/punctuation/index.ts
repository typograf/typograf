import Typograf from '../../../typograf';

import apostrophe from './apostrophe';
import delDoublePunctuation from './delDoublePunctuation';
import hellip from './hellip';
import quote from './quote';
import quoteLink from './quoteLink';

Typograf.addRules([
    apostrophe,
    delDoublePunctuation,
    hellip,
    quote,
    quoteLink
]);
