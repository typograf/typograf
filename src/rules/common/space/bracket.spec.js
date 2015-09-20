tests.push(['common/space/bracket', [
    [
        ' ( ) ',
        ' () '
    ],
    [
        '\n\n( \n\n )\n\n',
        '\n\n(\n\n)\n\n'
    ],
    [
        '     (    abc     abc         )     (    abc     )   ( a ( b ( c )  )  )    ',
        '     (abc     abc)     (abc)   (a (b (c)))    '
    ]
]]);
