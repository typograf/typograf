import { Typograf } from '../../../main';
import { delBOMRule } from './delBOM';
import { repeatWordRule } from './repeatWord';

Typograf.addRules([
    delBOMRule,
    repeatWordRule,
]);
