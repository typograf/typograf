import { Typograf } from '../../../main';

import { accentRule } from './accent';
import { phoneNumberRule } from './phone-number';

Typograf.addRules([
    accentRule,
    phoneNumberRule,
]);
