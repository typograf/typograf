import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest([
    'common/punctuation/quote', [
        [
            '"L’ouvreuse m’a dit: "Donnez-moi votre ticket." Je le lui ai donné."',
            '«\u202FL’ouvreuse m’a dit: “Donnez-moi votre ticket.” Je le lui ai donné.\u202F»'
        ],
        [
            'À l’occasion du premier tour de l’élection présidentielle, « La Croix » a demandé à quinze responsables associatifs de dire quelle serait leur priorité s’ils accédaient à la tête de l’État.',
            'À l’occasion du premier tour de l’élection présidentielle, «\u202FLa Croix\u202F» a demandé à quinze responsables associatifs de dire quelle serait leur priorité s’ils accédaient à la tête de l’État.'
        ],
        [
            'Les adolescents sont globalement «\u00A0satisfaits de leur vie\u00A0»',
            'Les adolescents sont globalement «\u202Fsatisfaits de leur vie\u202F»'
        ],
        [
            '"Il a dit "bonjour"."',
            '«\u202FIl a dit “bonjour”.\u202F»'
        ],
        [
            '"Il a dit "elle a répondu "demain""."',
            '«\u202FIl a dit “elle a répondu ‘demain’”.\u202F»'
        ],
        [
            'Il a répondu : "Je viendrai demain."',
            'Il a répondu : «\u202FJe viendrai demain.\u202F»'
        ],
        [
            '"Viendrez-vous\u202F?" demanda-t-elle.',
            '«\u202FViendrez-vous\u202F?\u202F» demanda-t-elle.'
        ],
        [
            'Il appelle cela "une erreur".',
            'Il appelle cela «\u202Fune erreur\u202F».'
        ],
        [
            '"Oui", répondit-il.',
            '«\u202FOui\u202F», répondit-il.'
        ],
        [
            'A-t-il vraiment dit "demain"\u202F?',
            'A-t-il vraiment dit «\u202Fdemain\u202F»\u202F?'
        ]
    ],
    {locale: 'fr'}
]);
