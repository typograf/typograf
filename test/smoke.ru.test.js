import { typografTest } from './helpers';

const ruTests = [
    [
        '    Мир - мой мир!    ',
        'Мир\u00A0— мой\u00A0мир!'
    ],
    [
        'пошли письмо на http://ya.ru/',
        'пошли письмо на\u00A0http://ya.ru/'
    ],
    [
        'Мороз был страшный но яблони выжили.',
        'Мороз был страшный, но\u00A0яблони выжили.'
    ],
    [
        'Стекло двери, которая ведет на веранду, усеяно дождевыми каплями.',
        'Стекло двери, которая ведет на\u00A0веранду, усеяно дождевыми каплями.'
    ],
    [
        'Роман, в котором творческие принципы Достоевского воплощаются в полной мере а удивительное владение сюжетом достигает подлинного расцвета.',
        'Роман, в\u00A0котором творческие принципы Достоевского воплощаются в\u00A0полной мере, а\u00A0удивительное владение сюжетом достигает подлинного расцвета.'
    ],
    [
        '"Энергия соблазна: от внутреннего к внешнему"',
        '«Энергия соблазна: от\u00A0внутреннего к\u00A0внешнему»'
    ],
    [
        'Они показывают фильмы про то, как люди играют "играют в салочки" в концлагерях.',
        'Они показывают фильмы про то, как люди играют «играют в\u00A0салочки» в\u00A0концлагерях.'
    ],
    [
        'К примеру, ваш адрес: Россия, г.\u00A0Саратов, ул.\u00A0Антонова, дом\u00A025, кв.\u00A072.',
        'К\u00A0примеру, ваш адрес: Россия, г.\u00A0Саратов, ул.\u00A0Антонова, дом\u00A025, кв.\u00A072.'
    ],
    [
        'Я пошёл домой а он остался.',
        'Я\u00A0пошёл домой, а\u00A0он\u00A0остался.'
    ],
    [
        'И в г. Москве', 'И\u00A0в\u00A0г.\u00A0Москве',
        'И в г. Москве', 'И\u00A0в\u00A0г.\u00A0Москве',
    ],
    [
        'если целесообразно использовать в издании спец. сокращения (<a href="/other/">т.е. принятые только в спец. видах литературы и видах издания</a>)',
        'если целесообразно использовать в\u00A0издании спец. сокращения (<a href="/other/">т.\u00A0е. принятые только в\u00A0спец. видах литературы и\u00A0видах издания</a>)',
    ],
    [
        '2012-2015 г.',
        '2012–2015\u00A0гг.',
    ],
    [
        '© 2012-2015 гг.',
        '© 2012–2015\u00A0гг.'
    ],
    [
        '<div class="t"><p>"<i>Какой-то текст<a href="/">link</a></i>"</p></div>',
        '<div class="t"><p>«<i>Какой-то текст<a href="/">link</a></i>»</p></div>'
    ],
    [
        '?… !… …,',
        '?.. !.. …'
    ],
    [
        'https://www.youtube.com/watch?v=C0DPdy98e4c',
        'https://www.youtube.com/watch?v=C0DPdy98e4c'
    ],
    [
        'https://www.youtube.com/watch?v=C0DPdy98e4c\nhttps://www.youtube.com/watch?v=C0DPdy98e4c',
        'https://www.youtube.com/watch?v=C0DPdy98e4c\nhttps://www.youtube.com/watch?v=C0DPdy98e4c'
    ],
    [
        'https://lenta.ru/news/2016/04/12/notes/ 2010-12-11',
        'https://lenta.ru/news/2016/04/12/notes/ 11.12.2010',
        {
            enable: [ 'ru/date/fromISO' ]
        }
    ],
    [
        '   <p>Перевод статьи <a href="https://pascalhertleif.de">Pascal Hertleif</a>\n\
<a href="https://pascalhertleif.de/artikel/good-practices-for-writing-rust-libraries">“Good Practices for Writing Rust Libraries”</a>\n\
(2015.10.24).</p>',
        '<p>Перевод статьи <a href="https://pascalhertleif.de">Pascal Hertleif</a>\n\
«<a href="https://pascalhertleif.de/artikel/good-practices-for-writing-rust-libraries">Good Practices for Writing Rust Libraries</a>»\n\
(24.10.2015).</p>',
        {
            enable: [ 'ru/optalign/*' ]
        }
    ]
];

typografTest('ru smoke, double execute', ruTests, {locale: ['ru', 'en-US']});
