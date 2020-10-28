import { Rule } from '../../../types';

const rule: Rule = {
    name: 'common/punctuation/quoteLink',
    queue: 'show-safe-tags-html',
    index: '+5',
    handler(text, settings, context) {
        const quotes = this.getSetting<{ left: string[]; right: string[]; }>('common/punctuation/quote', context.options.locale[0]);

        if (!quotes) { return text; }
        const lquote1 = quotes.left[0];
        const rquote1 = quotes.right[0];
        let lquote2 = quotes.left[1];
        let rquote2 = quotes.right[1];

        lquote2 = lquote2 ? ('|' + lquote2) : '';
        rquote2 = rquote2 ? ('|' + rquote2) : '';

        const re = new RegExp('(<[aA]\\s[^>]*?>)(' + lquote1 + lquote2 + ')([^]*?)(' + rquote1 + rquote2 + ')(</[aA]>)', 'g');

        return text.replace(re, '$2$1$3$5$4');
    }
};

export default rule;
