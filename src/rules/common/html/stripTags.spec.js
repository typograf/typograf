tests.push(['common/html/stripTags', [
    ['123123 12<br/>12312 312 3<p>asdlalsdpa</p>', '123123 1212312 312 3asdlalsdpa'],
    ['<p', '<p'],
    ['<p align="center">Hello</p>', 'Hello']
]]);
