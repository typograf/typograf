import type { TypografContext, TypografRule } from '../../../main';
import { DataQuote, getData } from '../../../data';
import { getLocales } from '../../../locale';
import { deepCopy } from '../../../helpers/object';
import { repeat } from '../../../helpers/string';
import { privateLabel } from '../../../consts';
import { SafeTags } from '../../../safeTags';

const MAX_LEVEL_WITH_ERRORS = 2;

interface QuoteParams {
    context: TypografContext;
    safeTags: SafeTags;
    settings: DataQuote;
}

class Quote {
    private bufferQuotes = {
        left: '\uF005\uF006\uF007',
        right: '\uF008\uF009\uF0A0',
    };

    private beforeLeft = ' \n\t\u00a0\u202f[(';
    private afterRight = ' \n\t\u00a0\u202f!?.:;#*,…)\\]';

    public process(params: QuoteParams): string {
        let text = params.context.text;
        const count = this.count(text, params.settings);

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
    }

    private returnOriginalQuotes(text: string, originalSettings: DataQuote, bufferSettings: DataQuote): string {
        const buffer: Record<string, string> = {};
        for (let i = 0; i < bufferSettings.left.length; i++) {
            buffer[bufferSettings.left[i]] = originalSettings.left[i];
            buffer[bufferSettings.right[i]] = originalSettings.right[i];
        }

        return text.replace(new RegExp('[' + bufferSettings.left + bufferSettings.right + ']', 'g'), function(quote) {
            return buffer[quote];
        });
    }

    private getQuotes(settings?: DataQuote): string {
        return String(getData('common/quote')) + (settings ? settings.left + settings.right : '');
    }

    private count(text: string, settings?: DataQuote) {
        const count: Record<string, number> = { total: 0 };

        text.replace(new RegExp('[' + this.getQuotes(settings) + ']', 'g'), function(quote) {
            if (!count[quote]) {
                count[quote] = 0;
            }

            count[quote]++;
            count.total++;

            return quote;
        });

        return count;
    }

    private removeDuplicates(text: string, settings: DataQuote): string {
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
    }

    private removeSpacing(text: string, settings: DataQuote): string {
        for (let i = 0, len = settings.left.length; i < len; i++) {
            const lquote = settings.left[i];
            const rquote = settings.right[i];

            text = text
                .replace(new RegExp(lquote + '([ \u202F\u00A0])', 'g'), lquote)
                .replace(new RegExp('([ \u202F\u00A0])' + rquote, 'g'), rquote);
        }

        return text;
    }

    private setSpacing(text: string, settings: DataQuote): string {
        const len = settings.spacing === true ? settings.left.length : Number(settings.spacing);

        for (let i = 0; i < len; i++) {
            const lquote = settings.left[i];
            const rquote = settings.right[i];

            text = text
                .replace(new RegExp(lquote + '([^\u202F])', 'g'), lquote + '\u202F$1')
                .replace(new RegExp('([^\u202F])' + rquote, 'g'), '$1\u202F' + rquote);
        }

        return text;
    }

    private set(text: string, params: QuoteParams): string {
        const quotes = this.getQuotes(params.settings);

        const lquote = params.settings.left[0];
        const lquote2 = params.settings.left[1] || lquote;
        const rquote = params.settings.right[0];

        const reL = new RegExp('(^|[' + this.beforeLeft + '])([' + quotes + ']+)(?=[^\\s' + privateLabel + '])', 'gim');
        const reR = new RegExp('([^\\s' + privateLabel + '])([' + quotes + ']+)(?=[' + this.afterRight + ']|$)', 'gim');

        text = text
            .replace(reL, function($0, $1, $2) { return $1 + repeat(lquote, $2.length); })
            .replace(reR, function($0, $1, $2) { return $1 + repeat(rquote, $2.length); });

        text = this.setAboveTags(text, params);

        if (lquote !== lquote2) {
            text = this.setInner(text, params.settings);
        }

        return text;
    }

    private setAboveTags(text: string, params: QuoteParams): string {
        const quotes = this.getQuotes(params.settings);

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
                const prevInfo = params.safeTags.getPrevTagInfo(params.context, text, pos + 1);
                if (hasRight && prevInfo && prevInfo.group === 'html') {
                    return prev + (prevInfo.isClosing ? rquote : lquote) + next;
                }

                return prev + (!next || hasRight ? rquote : lquote) + next;
            } else {
                const hasLeft = this.beforeLeft.indexOf(prev) > -1;
                const nextInfo = params.safeTags.getNextTagInfo(params.context, text, pos + 1);
                if (hasLeft && nextInfo && nextInfo.group === 'html') {
                    return prev + (nextInfo.isClosing ? rquote : lquote) + next;
                }

                return prev + (!prev || hasLeft ? lquote : rquote) + next;
            }
        });
    }

    private getAboveTwoTags(text: string, pos: number, params: QuoteParams): string {
        const prevInfo = params.safeTags.getPrevTagInfo(params.context, text, pos);
        const nextInfo = params.safeTags.getNextTagInfo(params.context, text, pos);
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
    }

    private setInner(text: string, settings: DataQuote): string {
        const lquote = settings.left[0];
        const rquote = settings.right[0];
        const minLevel = 0;
        const levelInfo = this.getLevelInfo(text, settings);
        const maxLevel = levelInfo.maxLevel;
        let level = minLevel;
        let result = '';

        for (let i = 0, len = text.length; i < len; i++) {
            const letter = text[i];
            if (letter === lquote) {
                result += settings.left[Math.min(level, maxLevel - 1)];

                level++;

                if (levelInfo.hasErrors && level > maxLevel) {
                    level = maxLevel;
                }
            } else if (letter === rquote) {
                level = Math.max(minLevel, level - 1);

                result += settings.right[Math.min(level, maxLevel - 1)];
            } else {
                if (letter === '"') {
                    level = minLevel;
                }

                result += letter;
            }
        }

        return result;
    }

    private getLevelInfo(text: string, settings: DataQuote) {
        const count = this.count(text, settings);
        const leftQuote = settings.left[0];
        const rightQuote = settings.right[0];
        const length = settings.left.length;
        const hasErrors = count[leftQuote] !== count[rightQuote];

        return {
            hasErrors,
            maxLevel: hasErrors ? Math.min(length, MAX_LEVEL_WITH_ERRORS) : length,
        };
    }
}

const quote = new Quote();

type QuoteRuleSettings = Record<string, DataQuote>;
const settings: QuoteRuleSettings = {};

getLocales().forEach(locale => {
    settings[locale] = deepCopy(getData(locale + '/quote')) as DataQuote;
});

export const quoteRule: TypografRule<QuoteRuleSettings> = {
    name: 'common/punctuation/quote',
    handler(text, commonSettings, context) {
        const locale = context.prefs.locale[0];
        const settings = commonSettings[locale];

        if (!settings) { return text; }

        return quote.process({
            context,
            settings,
            safeTags: this.safeTags,
        });
    },
    settings,
};
