tests.push(['common/other/delBOM', [
    [
        '\uFEFFunicorn',
        'unicorn'
    ], 
    [
        '\xEF\xBB\xBFunicorn',
        'unicorn'
    ]
]]);
