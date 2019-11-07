import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest([
    'common/punctuation/quote', [
        [
            '"L’ouvreuse m’a dit: "Donnez-moi votre ticket." Je le lui ai donné."',
            '«\u202FL’ouvreuse m’a dit: ‹\u202FDonnez-moi votre ticket.\u202F› Je le lui ai donné.\u202F»'
        ],
        [
            'À l’occasion du premier tour de l’élection présidentielle, « La Croix » a demandé à quinze responsables associatifs de dire quelle serait leur priorité s’ils accédaient à la tête de l’État.',
            'À l’occasion du premier tour de l’élection présidentielle, «\u202FLa Croix\u202F» a demandé à quinze responsables associatifs de dire quelle serait leur priorité s’ils accédaient à la tête de l’État.'
        ],
        [
            'Les adolescents sont globalement «\u00A0satisfaits de leur vie\u00A0»',
            'Les adolescents sont globalement «\u202Fsatisfaits de leur vie\u202F»'
        ]
    ],
    {locale: 'fr'}
]);
