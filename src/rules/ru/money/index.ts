import { Typograf } from '../../../main';

import { currencyRule } from './currency';
import { rubleRule } from './ruble';

Typograf.addRules([
    currencyRule,
    rubleRule,
]);
