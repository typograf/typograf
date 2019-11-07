import Typograf from '../../../typograf';

import digitGrouping from './digitGrouping';
import fraction from './fraction';
import mathSigns from './mathSigns';
import times from './times';

Typograf.addRules([
    digitGrouping,
    fraction,
    mathSigns,
    times
]);
