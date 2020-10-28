import { Rule } from '../../../types';

import { privateLabel } from '../../../consts';

const defaultCityCodeLength = 5;
const countryCode = '7';
const exceptions: number[] = [];
const exceptionsMax = 8;
const exceptionsMin = 2;

[
    4162, 416332, 8512, 851111, 4722, 4725, 391379, 8442, 4732,
    4152, 4154451, 4154459, 4154455, 41544513, 8142, 8332, 8612,
    8622, 3525, 812, 8342, 8152, 3812, 4862, 3422, 342633, 8112,
    9142, 8452, 3432, 3434, 3435, 4812, 8432, 8439, 3822,
    4872, 3412, 3511, 3512, 3022, 4112, 4852, 4855, 3852, 3854,
    8182, 818, 90, 3472, 4741, 4764, 4832, 4922, 8172, 8202, 8722,
    4932, 493, 3952, 3951, 3953, 411533, 4842, 3842, 3843, 8212,
    4942, '39131-39179', '39190-39199', 391, 4712, 4742, 8362, 495, 499, 4966, 4964, 4967, 498,
    8312, 8313, 3832, 383612, 3532, 8412, 4232, 423370, 423630, 8632,
    8642, 8482, 4242, 8672, 8652, 4752, 4822, 482502, 4826300, 3452,
    8422, 4212, 3466, 3462, 8712, 8352,
    '901-934', '936-939', '950-953', 958, '960-969',
    '977-989', '991-997', 999
].forEach(num => {
    if (typeof num === 'string') {
        const buf = num.split('-');
        for (let i = +buf[0]; i <= +buf[1]; i++) {
            exceptions.push(i);
        }
    } else {
        exceptions.push(num);
    }
});

function phone(num: string) {
    const firstSym = num[0];
    let cityCode = '';
    let hasPlusWithCode;
    let hasEight;

    if (num.length < 8) {
        return phoneBlocks(num);
    }

    // 8 495 123-45-67, +7 495 123-45-67
    if (num.length > 10) {
        if (firstSym === '+') {
            if (num[1] === countryCode) {
                hasPlusWithCode = true;
                num = num.substr(2);
            } else {
                return num;
            }
        } else if (firstSym === '8') {
            hasEight = true;
            num = num.substr(1);
        }
    }

    for (let cityCodeLen = exceptionsMax; cityCodeLen >= exceptionsMin; cityCodeLen--) {
        const code = +num.substr(0, cityCodeLen);
        if (exceptions.indexOf(code) > -1) {
            cityCode = num.substr(0, cityCodeLen);
            num = num.substr(cityCodeLen);
            break;
        }
    }

    if (!cityCode) {
        cityCode = num.substr(0, defaultCityCodeLength);
        num = num.substr(defaultCityCodeLength);
    }

    return (hasPlusWithCode ? '+' + countryCode + '\u00A0' : '') +
        (hasEight ? '8\u00A0' : '') +
        prepareCode(cityCode) + '\u00A0' +
        phoneBlocks(num);
}

function prepareCode(code: string) {
    const numCode = +code;
    const len = code.length;
    let buffer = [ code ];
    let withoutBrackets = false;

    if (len > 3) {
        switch (len) {
            case 4:
                buffer = [code.substr(0, 2), code.substr(2, 2)];
                break;
            case 5:
                buffer = [code.substr(0, 3), code.substr(3, 3)];
                break;
            case 6:
                buffer = [code.substr(0, 2), code.substr(2, 2), code.substr(4, 2)];
                break;
        }
    } else {
        // Мобильные и московские номера без скобок
        withoutBrackets = (numCode > 900 && numCode <= 999) || numCode === 495 || numCode === 499;
    }

    const result = buffer.join('-');

    return withoutBrackets ? result : '(' + result + ')';
}

function phoneBlocks(num: string){
    let add = '';
    if (num.length % 2) {
        add = num[0];
        add += num.length <= 5 ? '-' : '';
        num = num.substr(1, num.length - 1);
    }

    return add + num.split(/(?=(?:\d\d)+$)/).join('-');
}

function clearPhone(text: string) {
    return text.replace(/[^\d+]/g, '');
}

const rule: Rule = {
    name: 'ru/other/phoneNumber',
    live: false,
    handler(text) {
        const re = new RegExp('(^|,| |' + privateLabel + ')(\\+7[\\d\\(\\) \u00A0-]{10,18})(?=,|;|' + privateLabel + '|$)', 'gm');

        return text
            .replace(re, ($0: string, $1: string, $2: string) => {
                const buf = clearPhone($2);

                return buf.length === 12 ? $1 + phone(buf) : $0;
            })
            .replace(
                // eslint-disable-next-line no-misleading-character-class
                /(^|[^а-яё])([☎☏✆📠📞📱]|т\.|тел\.|ф\.|моб\.|факс|сотовый|мобильный|телефон)(:?\s*?)([+\d(][\d \u00A0\-()]{3,}\d)/gi,
                ($0: string, $1: string, $2: string, $3: string, $4: string) => {
                    const buf = clearPhone($4);
                    if (buf.length >= 5) {
                        return $1 + $2 + $3 + phone(buf);
                    }

                    return $0;
                }
            );
    }
};

export default rule;
