import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/nbsp/centuries', [
    ['XXв.', 'XX\u00A0в.'],
    ['XX век', 'XX век'],
    ['XX век\nXX век', 'XX век\nXX век'],
    ['XXв., XXIв.', 'XX\u00A0в., XXI\u00A0в.'],
    ['XX-XXIвв.', 'XX-XXI\u00A0вв.'],
    ['XX-XXIвв.\nXX-XXIвв.', 'XX-XXI\u00A0вв.\nXX-XXI\u00A0вв.'],
    ['XX-XXIв. в.', 'XX-XXI\u00A0вв.'],
    ['XX-XXI в. в.', 'XX-XXI\u00A0вв.'],
    ['XX-XXI в.', 'XX-XXI\u00A0вв.'],
    ['XX-XXI веках', 'XX-XXI веках'],
    ['XX-XXI веках\nXX-XXI веках', 'XX-XXI веках\nXX-XXI веках'],
    ['XX-XXI веках,\nXX-XXI веках', 'XX-XXI веках,\nXX-XXI веках']
]]);
