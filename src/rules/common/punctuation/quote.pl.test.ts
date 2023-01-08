import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest([
    'common/punctuation/quote', [
        [
            'Czy można jeszcze wątpić, że "tak naprawdę nie dzieje się nic i nie stanie się nic aż do końca"?',
            'Czy można jeszcze wątpić, że „tak naprawdę nie dzieje się nic i nie stanie się nic aż do końca”?'
        ]
    ],
    {locale: 'pl'}
]);
