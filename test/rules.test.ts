import Typograf from '../src/typograf';

describe('common specific tests', () => {
    const tests = [
        {
            enableRule: 'common/html/stripTags',
            tests: [
                [
                    '<p align="center">Hello world!</p> <a href="/">Hello world!</a>\n\n<pre>Hello world!</pre>',
                    'Hello world! Hello world!\n\nHello world!'
                ],
                [
                    '<p align="center" Hello world!</p>',
                    ''
                ]
            ]
        },
        {
            enableRule: 'common/html/escape',
            tests: [
                [
                    '<p align="center">\nHello world!\n</p>',
                    '&lt;p align=&quot;center&quot;&gt;\nHello world!\n&lt;&#x2F;p&gt;'
                ]
            ]
        },
        {
            enableRule: ['common/html/p', 'common/html/url'],
            tests: [
                [
                    'http://example.com',
                    '<p><a href="http://example.com">example.com</a></p>'
                ],
                [
                    'https://example.com',
                    '<p><a href="https://example.com">https://example.com</a></p>'
                ]
            ]
        },
        {
            locale: ['ru', 'en-US'],
            enableRule: 'common/html/processingAttrs',
            tests: [
                [
                    '<p title="   Hello world!!    " placeholder="    Hello world!!    ">     Hello world!!     </p>',
                    '<p title="Hello world!" placeholder="Hello world!"> Hello world! </p>'
                ],
                [
                    '<p data-title="    Hello world!!    ">     Hello world!!     </p>',
                    '<p data-title="    Hello world!!    "> Hello world! </p>'
                ],
                [
                    '<p title="    Hello world!!    ">     Hello world!!     </p>\n<p title="    Hello world!!    ">     Hello world!!     </p>',
                    '<p title="Hello world!"> Hello world! </p>\n<p title="Hello world!"> Hello world! </p>'
                ]
            ]
        }
    ];

    tests.forEach(item => {
        it(item.enableRule.toString(), () => {

            const typograf = new Typograf({
                locale: item.locale || 'en-US',
                enableRule: item.enableRule,
            });

            item.tests.forEach(subitem => {
                expect(typograf.execute(subitem[0])).toEqual(subitem[1]);
            });

        });
    });
});

describe('russian specific tests', () => {
    it('quotes lquote = lquote2 and rquote = rquote2', () => {
        const name = 'common/punctuation/quote';
        const typograf = new Typograf({
            locale: 'ru',
            disableRule: '*',
            enableRule: name,
        });
        const quoteTests = [
            [
                '"Триллер “Закрытая школа” на СТС"',
                '«Триллер «Закрытая школа» на СТС»'
            ],
            [
                'Триллер "Триллер “Закрытая школа” на СТС" Триллер',
                'Триллер «Триллер «Закрытая школа» на СТС» Триллер'
            ],
            [
                '"“Закрытая школа” на СТС"',
                '«Закрытая школа» на СТС»'
            ],
            [
                'Триллер "“Закрытая школа” на СТС" Триллер',
                'Триллер «Закрытая школа» на СТС» Триллер'
            ],
            [
                '"Триллер “Закрытая школа"',
                '«Триллер «Закрытая школа»'
            ],
            [
                'Триллер "Триллер “Закрытая школа" Триллер',
                'Триллер «Триллер «Закрытая школа» Триллер'
            ]
        ];

        typograf.setSetting(name, 'ru', {
            left: '«',
            right: '»',
            removeDuplicateQuotes: true
        });

        quoteTests.forEach(item => {
            const [before, after] = item;
            expect(typograf.execute(before)).toEqual(after);
        });
    });

    it('ru/optalign', () => {
        const typograf = new Typograf({
            locale: ['ru', 'en-US'],
        });

        typograf.enableRule('ru/optalign/*');

        [
            [
                '<p>"что-то, где-то!"</p>',
                '<p><span class="typograf-oa-n-lquote">«</span>что-то<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>где-то!»</p>'
            ],
            [
                '<p><span class="typograf-oa-n-lquote">«</span>что-то<span class="typograf-oa-comma"></span><span class="typograf-oa-comma"></span><span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>где-то!»</p>',
                '<p><span class="typograf-oa-n-lquote">«</span>что-то<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>где-то!»</p>'
            ],
            [
                '<title>"что-то, где-то!"</title><p>"что-то, где-то!"</p>',
                '<title>«что-то, где-то!»</title><p><span class="typograf-oa-n-lquote">«</span>что-то<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>где-то!»</p>'
            ],
            [
                '<TITLE>"что-то, где-то!"</TITLE><P>"что-то, где-то!"</P>',
                '<TITLE>«что-то, где-то!»</TITLE><P><span class="typograf-oa-n-lquote">«</span>что-то<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>где-то!»</P>'
            ],
            [
                '<html><head><title>Большие бинари в моем Rust?<span class="typograf-oa-sp-lbracket"> </span><span class="typograf-oa-lbracket">(</span>Why is a Rust executable large?) | Ржавый ящик</title></head><body></body></html>',
                '<html><head><title>Большие бинари в\u00A0моем Rust? (Why is\u00A0a\u00A0Rust executable large?) | Ржавый ящик</title></head><body></body></html>'
            ]
        ].forEach(item => {
            expect(typograf.execute(item[0])).toEqual(item[1]);
        });
    });

    it('should disable ru/optalign', () => {
        const localTypograf = new Typograf({
            locale: 'ru',
            disableRule: '*',
        });

        [
            '<span class="typograf-oa-sp-lquot"> </span>',
            '<span class="typograf-oa-lquot">«</span>',
            '<span class="typograf-oa-comma">,</span>',
            '<span class="typograf-oa-sp-lbracket"> </span>'
        ].forEach(item => {
            expect(localTypograf.execute(item)).toEqual(item);
        });
    });
});
