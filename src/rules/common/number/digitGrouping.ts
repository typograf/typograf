import type { TypografRule } from '../../../main';
import { privateLabel } from '../../../consts';

export const digitGroupingRule: TypografRule<{ space: string; }> = {
    name: 'common/number/digitGrouping',
    index: '310',
    disabled: true,
    handler(text, settings) {
        return text
            .replace(
                new RegExp(`(^ ?|\\D |${privateLabel})(\\d{1,3}([ \u00A0\u202F\u2009]\\d{3})+)(?! ?[\\d-])`, 'gm'),
                ($0, $1, $2) => $1 + $2.replace(/\s/g, settings.space)
            )
            // https://www.bipm.org/utils/common/pdf/si-brochure/SI-Brochure-9-EN.pdf #5.4.4
            .replace(
                /(\d{5,}([.,]\d+)?)/g,
                ($0, $1) => {
                    const decimalMarker = $1.match(/[.,]/);

                    const parts = decimalMarker ? $1.split(decimalMarker) : [ $1 ];
                    let integerPart = parts[0];
                    const fractionalPart = parts[1];
                    integerPart = integerPart.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1' + settings.space);

                    return decimalMarker ?
                        integerPart + decimalMarker + fractionalPart :
                        integerPart;
                }
            );
    },
    settings: {
        space: '\u202F',
    },
};
