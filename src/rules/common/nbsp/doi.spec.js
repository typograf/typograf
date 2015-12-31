tests.push(['common/nbsp/doi', [
    [
        'DOI 10.1016/j.matcom.2008.08.004',
        'DOI\u00A010.1016/j.matcom.2008.08.004'
    ],
    [
        '(DOI 10.1016/j.matcom.2008.08.004)',
        '(DOI\u00A010.1016/j.matcom.2008.08.004)'
    ],
    [
        ' DOI 10.1016/j.matcom.2008.08.004',
        ' DOI\u00A010.1016/j.matcom.2008.08.004'
    ],
    [
        ' DOI 10.1016/j.matcom.2008.08.004\n DOI 10.1016/j.matcom.2008.08.004',
        ' DOI\u00A010.1016/j.matcom.2008.08.004\n DOI\u00A010.1016/j.matcom.2008.08.004'
    ]
]]);
