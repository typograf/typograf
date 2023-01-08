import { Typograf } from '../../../main';

import { abbrRule } from './abbr';
import { addrRule } from './addr';
import { afterNumberSignRule } from './afterNumberSign';
import { beforeParticleRule } from './beforeParticle';
import { centuriesRule } from './centuries';
import { dayMonthRule } from './dayMonth';
import { initialsRule } from './initials';
import { mRule } from './m';
import { mlnRule } from './mln';
import { oooRule } from './ooo';
import { pageRule } from './page';
import { psRule } from './ps';
import { rubleKopekRule } from './rubleKopek';
import { seeRule } from './see';
import { yearRule } from './year';
import { yearsRule } from './years';

Typograf.addRules([
    abbrRule,
    addrRule,
    afterNumberSignRule,
    beforeParticleRule,
    centuriesRule,
    dayMonthRule,
    initialsRule,
    mRule,
    mlnRule,
    oooRule,
    pageRule,
    psRule,
    rubleKopekRule,
    seeRule,
    yearRule,
    yearsRule,
]);
