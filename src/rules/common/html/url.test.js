import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/html/url', [
    ['Ссылка ftp://example.com', 'Ссылка <a href="ftp://example.com">ftp://example.com</a>'],
    ['Ссылка https://example.com', 'Ссылка <a href="https://example.com">https://example.com</a>'],
    ['Ссылка http://example.com/path/', 'Ссылка <a href="http://example.com/path/">example.com/path/</a>'],
    ['Ссылка http://ww2.example.com/path/', 'Ссылка <a href="http://ww2.example.com/path/">ww2.example.com/path/</a>'],
    ['Ссылка http://www.example.com/path/', 'Ссылка <a href="http://www.example.com/path/">example.com/path/</a>'],
    ['Ссылка http://www.example.com/', 'Ссылка <a href="http://www.example.com">example.com</a>'],
    ['Ссылка http://www.example.com?', 'Ссылка <a href="http://www.example.com">example.com</a>'],
    [
        'Ссылка 1: http://www.example.com/?\nСсылка 2: https://www.example2.ru/?',
        'Ссылка 1: <a href="http://www.example.com">example.com</a>\nСсылка 2: <a href="https://www.example2.ru">https://example2.ru</a>'
    ],
    ['Ссылка http://www.example.com/?', 'Ссылка <a href="http://www.example.com">example.com</a>'],
    ['Ссылка http://www.example.com#', 'Ссылка <a href="http://www.example.com">example.com</a>'],
    ['Ссылка http://www.example.com/#', 'Ссылка <a href="http://www.example.com">example.com</a>'],
    ['Ссылка http://www.example.com:80', 'Ссылка <a href="http://www.example.com">example.com</a>'],
    ['Ссылка http://www.example.com:800', 'Ссылка <a href="http://www.example.com:800">example.com:800</a>'],
    ['Ссылка http://www.example.com:80/?', 'Ссылка <a href="http://www.example.com">example.com</a>'],
    ['Ссылка http://www.example.com:80/?query=hello', 'Ссылка <a href="http://www.example.com/?query=hello">example.com/?query=hello</a>'],
    ['Ссылка http://www.example.com:443', 'Ссылка <a href="http://www.example.com:443">example.com:443</a>'],
    ['Ссылка https://www.example.com:443/?', 'Ссылка <a href="https://www.example.com">https://example.com</a>'],
    ['Ссылка https://www.example.com:443/?query=hello', 'Ссылка <a href="https://www.example.com/?query=hello">https://example.com/?query=hello</a>'],
    ['Ссылка https://www.example.com:4434/?query=hello', 'Ссылка <a href="https://www.example.com:4434/?query=hello">https://example.com:4434/?query=hello</a>'],
    ['<a href="https://www.example.com">https://www.example.com</a>', '<a href="https://www.example.com">https://www.example.com</a>']
]]);
