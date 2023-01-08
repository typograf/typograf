import { Typograf } from '../../../main';

import { digitGroupingRule } from './digitGrouping';
import { fractionRule } from './fraction';
import { mathSignsRule } from './mathSigns';
import { timesRule } from './times';

Typograf.addRules([
    digitGroupingRule,
    fractionRule,
    mathSignsRule,
    timesRule,
]);
