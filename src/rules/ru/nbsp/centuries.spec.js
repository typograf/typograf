tests.push(['ru/nbsp/centuries', [
    ['XXв.', 'XX\u00A0в.'],
    ['XXв., XXIв.', 'XX\u00A0в., XXI\u00A0в.'],
    ['XX-XXIвв.', 'XX-XXI\u00A0вв.'],
    ['XX-XXIв. в.', 'XX-XXI\u00A0вв.'],
    ['XX-XXI в. в.', 'XX-XXI\u00A0вв.'],
    ['XX-XXI в.', 'XX-XXI\u00A0вв.']
]]);
