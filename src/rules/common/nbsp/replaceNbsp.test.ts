import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/nbsp/replaceNbsp', [
    [
        'Флойд\u00A0Мэйуэзер\u00A0одержал\u00A049-ю\u00A0победу\u00A0и\u00A0объявил\u00A0о\u00A0завершении карьеры',
        'Флойд Мэйуэзер одержал 49-ю победу и объявил о завершении карьеры'
    ]
]]);
