import { Typograf } from '../../../main';
import { anoRule } from './ano';
import { exclamationRule } from './exclamation';
import { exclamationQuestionRule } from './exclamationQuestion';
import { hellipQuestionRule } from './hellipQuestion';

Typograf.addRules([
    anoRule,
    exclamationRule,
    exclamationQuestionRule,
    hellipQuestionRule,
]);
