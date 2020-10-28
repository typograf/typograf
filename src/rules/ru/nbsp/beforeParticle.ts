import { Rule } from '../../../types';

const rule: Rule = {
    name: 'ru/nbsp/beforeParticle',
    index: '+5',
    handler(text) {
        const particles = '(ли|ль|же|ж|бы|б)';
        const re1 = new RegExp('([А-ЯЁа-яё]) ' + particles + '(?=[,;:?!"‘“»])', 'g');
        const re2 = new RegExp('([А-ЯЁа-яё])[ \u00A0]' + particles + '[ \u00A0]', 'g');

        return text
            .replace(re1, '$1\u00A0$2')
            .replace(re2, '$1\u00A0$2 ');
    }
};

export default rule;
