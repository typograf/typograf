tests.push(['common/html/p', [
    ['a\n\nb\nc\n\nd', '<p>a</p>\n<p>b\nc</p>\n<p>d</p>'],
    ['a', '<p>a</p>'],
    ['<p>a</p>\n\n\n<p>b</p>', '<p>a</p>\n\n\n<p>b</p>']
]]);
