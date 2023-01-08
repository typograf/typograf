import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/space/afterColon', [
    [
        'Перечень приобретаемого:КОНДЕНСАТОРЫ КМ,К52-2,ЭТО-2.',
        'Перечень приобретаемого: КОНДЕНСАТОРЫ КМ,К52-2,ЭТО-2.',
    ]
]]);
