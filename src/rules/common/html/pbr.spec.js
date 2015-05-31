tests.push(['common/html/pbr', [
    ['a\n\nb\nc\n\nd', '<p>a</p>\n<p>b<br/>\nc</p>\n<p>d</p>'],
    ['a', '<p>a</p>'],
    ['a\n\n\nb<br/>', 'a\n\n\nb<br/>'],
    ['<p>a</p>\n\n\n<p>b</p>', '<p>a</p>\n\n\n<p>b</p>']
]]);
