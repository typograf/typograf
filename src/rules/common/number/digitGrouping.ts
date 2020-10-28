import { Rule } from '../../../types';
import { privateLabel } from '../../../consts';

const rule: Rule<{ space: string; }> = {
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
                ($0, $1: string) => {
                    const re = /[.,]/;
                    const decimalMarker = $1.match(re);

                    const parts = decimalMarker ? $1.split(re) : [ $1 ];
                    const integerPart = parts[0].replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1' + settings.space);
                    const fractionalPart = parts[1];

                    return decimalMarker ?
                        integerPart + decimalMarker[0] + fractionalPart :
                        integerPart;
                }
            );
    },
    settings: {
        space: '\u202F'
    }
};

export default rule;
