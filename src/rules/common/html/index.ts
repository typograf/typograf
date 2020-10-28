import Typograf from '../../../typograf';

import eMail from './e-mail';
import escape from './escape';
import nbr from './nbr';
import p from './p';
import processingAttrs from './processingAttrs';
import quot from './quot';
import stripTags from './stripTags';
import url from './url';

Typograf.addRules([
    eMail,
    escape,
    nbr,
    p,
    processingAttrs,
    quot,
    stripTags,
    url
]);
