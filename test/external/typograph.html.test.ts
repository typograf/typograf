import { typografTest, TypografTest } from '../helpers';

// https://github.com/samdark/Typograph/blob/master/tests/_test.typo-html.dat
const ruTests: TypografTest[] = [
    [
        '<i>О проекте программы "О космической деятельности". </i>',
        '<i>О\u00A0проекте программы «О\u00A0космической деятельности». </i>'
    ],
    [
        '<b aaa="1">',
        '<b aaa="1">'
    ],
    [
        '<b aaa="1" bbb="2">',
        '<b aaa="1" bbb="2">'
    ],
    [
        '<b aaa="1" bbb="2" ccc="3">',
        '<b aaa="1" bbb="2" ccc="3">'
    ],
    [
        '<b aaa="1" bbb="2" ccc="3" ddd="4">',
        '<b aaa="1" bbb="2" ccc="3" ddd="4">'
    ],
    [
        '123 <img alt=":)" src="/images/smiles/smile.gif"> 123',
        '123 <img alt=":)" src="/images/smiles/smile.gif"> 123'
    ],
    [
        '<img alt=":)" src="/images/smiles/smile.gif">',
        '<img alt=":)" src="/images/smiles/smile.gif">'
    ],
    [
        '<a href="http://www.professionalconsulting.ru/blog/realcms/">"CMS на самом деле"</a>',
        '«<a href="http://www.professionalconsulting.ru/blog/realcms/">CMS на\u00A0самом деле</a>»'
    ],
    [
        '<img width="200" height="150" src="/images/cds.jpg" alt="/images/cds.jpg">',
        '<img width="200" height="150" src="/images/cds.jpg" alt="/images/cds.jpg">'
    ],
    [
        '<b>"done"</b>',
        '<b>«done»</b>'
    ],
    [
        '"<b>done</b>"',
        '«<b>done</b>»'
    ],
    [
        '"word" <pre as="is" is="as">"q"</pre> "word"',
        '«word» <pre as="is" is="as">"q"</pre> «word»'
    ],
    [
        '"word" <pre as="is" is="as"> word "q"</pre> "word"',
        '«word» <pre as="is" is="as"> word "q"</pre> «word»'
    ],
    [
        '"word" <pre as="is" is="as">word</pre> "word"',
        '«word» <pre as="is" is="as">word</pre> «word»'
    ],
    [
        'doo "bee" <!-- doo "bee" --> doo',
        'doo «bee» <!-- doo "bee" --> doo'
    ],
    [
        '(c) <pre>(c)</pre> (c) <pre>(c)</pre> (c)',
        '© <pre>(c)</pre> © <pre>(c)</pre> ©'
    ],
    [
        '(c) <pre>(c)</pre> (c) (c)',
        '© <pre>(c)</pre> © ©'
    ],
    [
        'word "<a href="http://url.ru/">word</a>".',
        'word «<a href="http://url.ru/">word</a>».'
    ],
    [
        'radio "<a href="http://ya.ru/">voice of africa</a>" ddddd',
        'radio «<a href="http://ya.ru/">voice of\u00A0africa</a>» ddddd'
    ],
    [
        '"text" <pre> "code" </pre> "text"',
        '«text» <pre> "code" </pre> «text»'
    ],
    [
        'text <a href="htrt" b="sdf">kiss "me" </a> text',
        'text <a href="htrt" b="sdf">kiss «me» </a> text'
    ],
    [
        '"<a href="http://rmc.net.ru/article/photo/001/">Фотография</a>"',
        '«<a href="http://rmc.net.ru/article/photo/001/">Фотография</a>»'
    ],
    [
        'Сегодня был создан раздел "<a href="http://rmc.net.ru/article/photo/001/">Фотография</a>", куда будут выкладываться сделанные нами фото.',
        'Сегодня был создан раздел «<a href="http://rmc.net.ru/article/photo/001/">Фотография</a>», куда будут выкладываться сделанные нами фото.'
    ],
    [
        '<img src="http://dash-domain-here.com" alt="http://dash-domain-here.com">',
        '<img src="http://dash-domain-here.com" alt="http://dash-domain-here.com">'
    ]
];

typografTest(
    'typograph html',
    ruTests,
    { locale: ['ru', 'en-US'] },
);
