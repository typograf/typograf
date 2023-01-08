import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/html/p', [
    ['a\n\nb\nc\n\nd', '<p>a</p>\n\n<p>b\nc</p>\n\n<p>d</p>'],
    ['a', '<p>a</p>'],
    ['\n<h1>Header</h1>\n\n<a href="#">Link</a>\n', '\n<h1>Header</h1>\n\n<p><a href="#">Link</a></p>\n'],
    ['\n\n<h1>Header</h1>\n\n\n\n\n<a href="#">Link</a>\n\n', '\n\n<h1>Header</h1>\n\n\n\n\n<p><a href="#">Link</a></p>\n\n'],
    ['<p>a</p>\n\n\n<p>b</p>', '<p>a</p>\n\n\n<p>b</p>']
]]);
