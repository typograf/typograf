import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['ru/nbsp/beforeParticle', [
    ['Может ли быть?', 'Может\u00A0ли быть?'],
    ['Может же быть?', 'Может\u00A0же быть?']
]]);
