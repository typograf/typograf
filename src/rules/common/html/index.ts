import { Typograf } from '../../../main';

import { eMailRule } from './e-mail';
import { escapeRule } from './escape';
import { nbrRule } from './nbr';
import { pRule } from './p';
import { processingAttrsRule } from './processingAttrs';
import { quotRule } from './quot';
import { stripTagsRule } from './stripTags';
import { urlRule } from './url';

Typograf.addRules([
    eMailRule,
    escapeRule,
    nbrRule,
    pRule,
    processingAttrsRule,
    quotRule,
    stripTagsRule,
    urlRule,
]);
