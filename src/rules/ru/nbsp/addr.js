export default {
    name: 'ru/nbsp/addr',
    handler(text) {
        return text
            .replace(/(\s|^)(дом|д\.|кв\.|под\.|п-д) *(\d+)/gi, '$1$2\u00A0$3')
            .replace(/(\s|^)(мкр-н|мк-н|мкр\.|мкрн)\s/gi, '$1$2\u00A0') // микрорайон
            .replace(/(\s|^)(эт\.) *(-?\d+)/gi, '$1$2\u00A0$3')
            .replace(/(\s|^)(\d+) +этаж([^а-яё]|$)/gi, '$1$2\u00A0этаж$3')
            .replace(/(\s|^)литер\s([А-Я]|$)/gi, '$1литер\u00A0$2')
            /*
                область, край, станция, поселок, село,
                деревня, улица, переулок, проезд, проспект,
                бульвар, площадь, набережная, шоссе,
                тупик, офис, комната, участок, владение, строение, корпус
            */
            .replace(/(\s|^)(обл|кр|ст|пос|с|д|ул|пер|пр|пр-т|просп|пл|бул|б-р|наб|ш|туп|оф|комн?|уч|вл|влад|стр|кор)\. *([а-яёa-z\d]+)/gi, '$1$2.\u00A0$3')
            // город
            .replace(/(\D[ \u00A0]|^)г\. ?([А-ЯЁ])/gm, '$1г.\u00A0$2');
    }
};
