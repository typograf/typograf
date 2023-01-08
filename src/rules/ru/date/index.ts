import { Typograf } from '../../../main';

import { fromISORule } from './fromISO';
import { weekdayRule } from './weekday';

Typograf.addRules([
    fromISORule,
    weekdayRule,
]);
