export default {
    'ru/char': 'а-яё',
    'ru/dashBefore': '(^| |\\n)',
    'ru/dashAfter': '(?=[\u00A0 ,.?:!]|$)',
    'ru/dashAfterDe': '(?=[,.?:!]|[\u00A0 ][^А-ЯЁ]|$)',
    'ru/l': 'а-яёa-z',
    'ru/L': 'А-ЯЁA-Z',
    'ru/month': 'январь|февраль|март|апрель|май|июнь|июль|август|сентябрь|октябрь|ноябрь|декабрь',
    'ru/monthGenCase': 'января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря',
    'ru/monthPreCase': 'январе|феврале|марте|апреле|мае|июне|июле|августе|сентябре|октябре|ноябре|декабре',
    'ru/quote': {
        left: '«„‚',
        right: '»“‘',
        removeDuplicateQuotes: true,
    },
    'ru/shortMonth': 'янв|фев|мар|апр|ма[ейя]|июн|июл|авг|сен|окт|ноя|дек',
    'ru/shortWord': 'а|бы|в|во|да|до|же|за|и|из|к|ко|ли|на|не|ни|но|о|об|от|по|с|со|то|у',
    'ru/weekday': 'понедельник|вторник|среда|четверг|пятница|суббота|воскресенье',
};
