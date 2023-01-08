import { Typograf } from '../../../main';

import { afterNumberRule } from './afterNumber';
import { afterParagraphMarkRule } from './afterParagraphMark';
import { afterSectionMarkRule } from './afterSectionMark';
import { afterShortWordRule } from './afterShortWord';
import { beforeShortLastNumberRule } from './beforeShortLastNumber';
import { beforeShortLastWordRule } from './beforeShortLastWord';
import { dpiRule } from './dpi';
import { nowrapRule } from './nowrap';
import { replaceNbspRule } from './replaceNbsp';

Typograf.addRules([
    afterNumberRule,
    afterParagraphMarkRule,
    afterSectionMarkRule,
    afterShortWordRule,
    beforeShortLastNumberRule,
    beforeShortLastWordRule,
    dpiRule,
    nowrapRule,
    replaceNbspRule,
]);
