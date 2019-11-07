import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest([
    'common/punctuation/quote', [
        [
            '"Varautuminen tällaisiin megaluokan tapahtumiin on heikkoa. Aurinkoa tarkkaillaan jatkuvasti ja noin valtava superroihu havaittaisiin kyllä, mutta hiukkaset olisivat täällä sen verran nopeasti, että melkeinpä mitään ei olisi tehtävissä." ',
            '”Varautuminen tällaisiin megaluokan tapahtumiin on heikkoa. Aurinkoa tarkkaillaan jatkuvasti ja noin valtava superroihu havaittaisiin kyllä, mutta hiukkaset olisivat täällä sen verran nopeasti, että melkeinpä mitään ei olisi tehtävissä.” '
        ]
    ],
    {locale: 'fi'}
]);
