import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/symbols/cf', [
    [' 200 C', ' 200 °C'],
    ['200 C', '200 °C'],
    ['&minus;20 C', '−20 °C'],
    ['-20 C', '-20 °C'],
    ['+10 C', '+10 °C'],
    ['±2,4 C', '±2,4 °C'],
    ['+1.5 C', '+1.5 °C'],
    ['1,5 C', '1,5 °C'],
    ['≈99 C', '≈99 °C'],
    ['B2C', 'B2C'],
    ['200 C\n 300 F', '200 °C\n 300 °F'],
    ['200 C\n300 F', '200 °C\n300 °F'],
    [' 200 C.', ' 200 °C.'],
    [' 20d C', ' 20d C'],
    [' 20 C1', ' 20 C1'],
    [' 200 F', ' 200 °F'],
    ['200 F', '200 °F'],
    [
        'https://ru.wikipedia.org/wiki/%D0%A4%D0%B0%D0%BC%D0%B8%D0%BB%D1%8C',
        'https://ru.wikipedia.org/wiki/%D0%A4%D0%B0%D0%BC%D0%B8%D0%BB%D1%8C'
    ]
]]);
