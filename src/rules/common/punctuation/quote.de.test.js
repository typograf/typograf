import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest([
    'common/punctuation/quote', [
        [
            'Dies habe, so Meyer, "nichts mit "Globalisierung" zu tun".',
            'Dies habe, so Meyer, „nichts mit ‚Globalisierung‘ zu tun“.'
        ]
    ],
    {locale: 'de'}
]);
