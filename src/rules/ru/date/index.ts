import Typograf from '../../../typograf';

import fromISO from './fromISO';
import weekday from './weekday';

Typograf.addRules([
    fromISO,
    weekday
]);
