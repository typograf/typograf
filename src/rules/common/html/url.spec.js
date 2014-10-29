tests.push(['common/html/url', [
    ['Ссылка https://example.com', 'Ссылка <a href="https://example.com">https://example.com</a>'],
    ['Ссылка http://example.com/', 'Ссылка <a href="http://example.com/">example.com</a>'],
    ['Ссылка http://example.com/path/', 'Ссылка <a href="http://example.com/path/">example.com/path/</a>'],
    ['Ссылка http://ww2.example.com/path/', 'Ссылка <a href="http://ww2.example.com/path/">ww2.example.com/path/</a>'],
    ['Ссылка http://www.example.com/path/', 'Ссылка <a href="http://www.example.com/path/">example.com/path/</a>']
]]);
