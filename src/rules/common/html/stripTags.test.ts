import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/html/stripTags', [
    [
        '<p>В апреле 2014 года Kadokawa Corporation объявила о намерении перекупить FromSoftware у компании Transcosmos.<br/>\nСделка была завершена 21 мая 2014 года.</p>',
        'В апреле 2014 года Kadokawa Corporation объявила о намерении перекупить FromSoftware у компании Transcosmos.\nСделка была завершена 21 мая 2014 года.',
    ],
    [
        '<p',
        '<p'
    ],
    [
        '<p align="center">Hello</p>',
        'Hello'
    ]
]]);
