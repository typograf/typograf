import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest([
    'common/punctuation/quote', [
        [
            'One of the most famous phrases is "to be or not to be".',
            'One of the most famous phrases is ‘to be or not to be’.'
        ],
        [
            '"I have no special talent," Einstein. "I am only curious enough."',
            '‘I have no special talent,’ Einstein. ‘I am only curious enough.’'
        ],
        [
            '"I was reading "The Economics of the USA" yesterday," she replied to me.',
            '‘I was reading “The Economics of the USA” yesterday,’ she replied to me.'
        ]
    ],
    {locale: 'en-GB'}
]);
