import Typograf from '../../../typograf';

import delBOM from './delBOM';
import repeatWord from './repeatWord';

Typograf.addRules([
    delBOM,
    repeatWord
]);
