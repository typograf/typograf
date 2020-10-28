import Typograf from '../../../typograf';
import { deepCopy } from '../../../helpers/object';
import { repeat } from '../../../helpers/string';
import { privateLabel } from '../../../consts';
import { Context, Rule } from '../../../types';
import SafeTags from '../../../safeTags';

interface QuoteSettings {
    left: string | string[];
    right: string | string[];
    removeDuplicateQuotes: boolean;
    spacing: string;
}

interface QuoteParams {
    context: Context;
    settings: QuoteSettings;
    safeTags: SafeTags;
}

type Settings = Record<string, QuoteSettings>;

const Quote = {
    bufferQuotes: {
        left: '\uF005\uF006\uF007',
        right: '\uF008\uF009\uF0A0'
    },
    maxLevel: 3,
    beforeLeft: ' \n\t\u00a0[(',
    afterRight: ' \n\t\u00a0!?.:;#*,…)',
    process(params: QuoteParams) {
        let text = params.context.text;
        const count = this.count(text);

        if (!count.total) {
            return text;
        }

        const originalSettings = params.settings;
        const isEqualQuotes = params.settings.left[0] === params.settings.right[0];
        // For SW, FI
        if (isEqualQuotes) {
            params.settings = deepCopy(params.settings);
            params.settings.left = this.bufferQuotes.left.slice(0, params.settings.left.length);
            params.settings.right = this.bufferQuotes.right.slice(0, params.settings.right.length);
        }

        // For FR
        if (params.settings.spacing) {
            text = this.removeSpacing(text, params.settings);
        }

        text = this.set(text, params);

        // For FR
        if (params.settings.spacing) {
            text = this.setSpacing(text, params.settings);
        }

        // For RU
        if (params.settings.removeDuplicateQuotes) {
            text = this.removeDuplicates(text, params.settings);
        }

        // For SW, FI
        if (isEqualQuotes) {
            text = this.returnOriginalQuotes(text, originalSettings, params.settings);
            params.settings = originalSettings;
        }

        return text;
    },
    returnOriginalQuotes(text: string, originalSettings: QuoteSettings, bufferSettings: QuoteSettings) {
        const buffer: Record<string, string> = {};
        for (let i = 0; i < bufferSettings.left.length; i++) {
            buffer[bufferSettings.left[i]] = originalSettings.left[i];
            buffer[bufferSettings.right[i]] = originalSettings.right[i];
        }

        return text.replace(new RegExp('[' + bufferSettings.left + bufferSettings.right + ']', 'g'),quote => {
            return buffer[quote];
        });
    },
    count(text: string) {
        const count: Record<string, number> = {total: 0};
        text.replace(new RegExp('[' + Typograf.getData('common/quote') + ']', 'g'), (quote: string) => {
            if (!count[quote]) {
                count[quote] = 0;
            }

            count[quote]++;
            count.total++;

            return quote;
        });

        return count;
    },
    removeDuplicates(text: string, settings: QuoteSettings) {
        const lquote = settings.left[0];
        const lquote2 = settings.left[1] || lquote;
        const rquote = settings.right[0];

        if (lquote !== lquote2) {
            return text;
        }

        return text
            // ««word» word» -> «word» word»
            .replace(new RegExp(lquote + lquote, 'g'), lquote)
            // «word «word»» -> «word «word»
            .replace(new RegExp(rquote + rquote, 'g'), rquote);
    },
    removeSpacing(text: string, settings: QuoteSettings) {
        for (let i = 0, len = settings.left.length; i < len; i++) {
            const lquote = settings.left[i];
            const rquote = settings.right[i];

            text = text
                .replace(new RegExp(lquote + '([ \u202F\u00A0])', 'g'), lquote)
                .replace(new RegExp('([ \u202F\u00A0])' + rquote, 'g'), rquote);
        }

        return text;
    },
    setSpacing(text: string, settings: QuoteSettings) {
        for (let i = 0, len = settings.left.length; i < len; i++) {
            const lquote = settings.left[i];
            const rquote = settings.right[i];

            text = text
                .replace(new RegExp(lquote + '([^\u202F])', 'g'), lquote + '\u202F$1')
                .replace(new RegExp('([^\u202F])' + rquote, 'g'), '$1\u202F' + rquote);
        }

        return text;
    },
    set(text: string, params: QuoteParams) {
        const quotes = Typograf.getData('common/quote');

        const lquote = params.settings.left[0];
        const lquote2 = params.settings.left[1] || lquote;
        const rquote = params.settings.right[0];

        const reL = new RegExp('(^|[' + this.beforeLeft + '])([' + quotes + ']{1,' + this.maxLevel + '})(?=[^\\s' + privateLabel + '])', 'gim');
        const reR = new RegExp('([^\\s' + privateLabel + '])([' + quotes + ']{1,' + this.maxLevel + '})(?=[' + this.afterRight + ']|$)', 'gim');

        text = text
            .replace(reL, ($0, $1, $2) => { return $1 + repeat(lquote, $2.length); })
            .replace(reR, ($0, $1, $2) => { return $1 + repeat(rquote, $2.length); });

        text = this.setAboveTags(text, params);

        if (lquote !== lquote2) {
            text = this.setInner(text, params.settings);
        }

        return text;
    },
    setAboveTags(text: string, params: QuoteParams) {
        const quotes = Typograf.getData('common/quote');

        const lquote = params.settings.left[0];
        const rquote = params.settings.right[0];

        return text.replace(new RegExp('(^|.)([' + quotes + '])(.|$)', 'gm'), (original, prev, quote, next, pos)  => {
            if (prev !== privateLabel && next !== privateLabel) {
                return original;
            }

            if (prev === privateLabel && next === privateLabel) {
                if (quote === '"') {
                    return prev + this.getAboveTwoTags(text, pos + 1, params) + next;
                }

                return original;
            }

            if (prev === privateLabel) {
                const hasRight = this.afterRight.indexOf(next) > -1;
                const prevInfo = this.getPrevTagInfo(text, pos - 1, params);
                if (hasRight && prevInfo && prevInfo.group === 'html') {
                    return prev + (prevInfo.isClosing ? rquote : lquote) + next;
                }

                return prev + (!next || hasRight ? rquote : lquote) + next;
            } else {
                const hasLeft = this.beforeLeft.indexOf(prev) > -1;
                const nextInfo = this.getNextTagInfo(text, pos + 1, params);
                if (hasLeft && nextInfo && nextInfo.group === 'html') {
                    return prev + (nextInfo.isClosing ? rquote : lquote) + next;
                }

                return prev + (!prev || hasLeft ? lquote : rquote) + next;
            }
        });
    },
    getAboveTwoTags(text: string, pos: number, params: QuoteParams) {
        const prevInfo = this.getPrevTagInfo(text, pos, params);
        const nextInfo = this.getNextTagInfo(text, pos, params);
        if (prevInfo) {
            if (prevInfo.group === 'html') {
                if (!prevInfo.isClosing) {
                    return params.settings.left[0];
                }

                if (nextInfo && nextInfo.isClosing && prevInfo.isClosing) {
                    return params.settings.right[0];
                }
            }
        }

        return text[pos];
    },
    getPrevTagInfo(text: string, pos: number, params: QuoteParams) {
        const prevLabel = params.safeTags.getPrevLabel(text, pos - 1);
        if (prevLabel) {
            const prevTag = params.safeTags.getTagByLabel(params.context, prevLabel);
            if (prevTag) {
                return params.safeTags.getTagInfo(prevTag);
            }
        }

        return null;
    },
    getNextTagInfo(text: string, pos: number, params: QuoteParams) {
        const nextLabel = params.safeTags.getNextLabel(text, pos + 1);
        if (nextLabel) {
            const nextTag = params.safeTags.getTagByLabel(params.context, nextLabel);
            if (nextTag) {
                return params.safeTags.getTagInfo(nextTag);
            }
        }

        return null;
    },
    setInner(text: string, settings: QuoteSettings) {
        const leftQuotes = [];
        const rightQuotes = [];

        for (let k = 0; k < settings.left.length; k++) {
            leftQuotes.push(settings.left[k]);
            rightQuotes.push(settings.right[k]);
        }

        const lquote = settings.left[0];
        const rquote = settings.right[0];
        const minLevel = -1;
        const maxLevel = leftQuotes.length - 1;
        let level = minLevel;
        let result = '';

        for (let i = 0, len = text.length; i < len; i++) {
            const letter = text[i];
            if (letter === lquote) {
                level++;
                if (level > maxLevel) {
                    level = maxLevel;
                }
                result += leftQuotes[level];
            } else if (letter === rquote) {
                if (level <= minLevel) {
                    level = 0;
                    result += rightQuotes[level];
                } else {
                    result += rightQuotes[level];
                    level--;
                    if (level < minLevel) {
                        level = minLevel;
                    }
                }
            } else {
                if (letter === '"') {
                    level = minLevel;
                }

                result += letter;
            }
        }

        const count = this.count(result);
        return count[lquote] !== count[rquote] ? text : result;
    }
};

const rule: Rule<() => Settings, Settings> = {
    name: 'common/punctuation/quote',
    handler(text, commonSettings, context) {
        const locale = context.options.locale[0];
        const settings = commonSettings[locale];

        if (!settings) { return text; }

        return Quote.process({
            context,
            settings,
            safeTags: this.safeTags
        });
    },
    settings(): Settings {
        const settings: Settings = {};

        Typograf.getLocales().forEach(locale => {
            settings[locale] = deepCopy(Typograf.getData(locale + '/quote'));
        });

        return settings;
    }
};

export default rule;
