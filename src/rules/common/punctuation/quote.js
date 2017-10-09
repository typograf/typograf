Typograf.addRule({
    name: 'common/punctuation/quote',
    handler(text, commonSettings, context) {
        const locale = context.prefs.locale[0];
        const localeSettings = commonSettings[locale];

        if (!localeSettings) { return text; }

        const lquote = localeSettings.left[0];
        const rquote = localeSettings.right[0];
        const lquote2 = localeSettings.left[1] || lquote;

        text = this._setQuotes(text, localeSettings);
        if (localeSettings.removeDuplicateQuotes && lquote === lquote2) {
            text = text
                // ««word» word» -> «word» word»
                .replace(new RegExp(lquote + lquote, 'g'), lquote)
                // «word «word»» -> «word «word»
                .replace(new RegExp(rquote + rquote, 'g'), rquote);
        }

        return text;
    },
    settings() {
        const settings = {};

        Typograf.getLocales().forEach(function(locale) {
            settings[locale] = Typograf.deepCopy(Typograf.getData(locale + '/quote'));
        });

        return settings;
    }
});

Typograf._mix(Typograf.prototype, {
    _setQuotes(text, settings) {
        const privateLabel = Typograf._privateLabel;
        const lquote = settings.left[0];
        const rquote = settings.right[0];
        const lquote2 = settings.left[1] || lquote;
        const quotes = '[' + Typograf.getData('common/quote') + ']';
        const reL = new RegExp('(^|[ \\t\\n\u00A0[(])("{1,3})(?=[^ \\t\\n\u00A0])', 'gim');
        const reR = new RegExp('([^ \\t\\n\u00A0])("{1,3})(?=[!?.:;#*,…)\\s' + privateLabel + ']|$)', 'gim');
        const reQuotes = new RegExp(quotes, 'g');
        const reClosingTag = new RegExp('(' + privateLabel + ')"(?=[^ \\t\\n' + privateLabel + ']|$)', 'gm');
        let count = 0;

        if (settings.spacing) {
            text = this._removeQuoteSpacing(text, settings);
        }

        // Hide incorrect quotes.
        text = text.replace(reQuotes, function() {
            count++;
            return '"';
        });

        text = text
            // Opening quote
            .replace(reL, function($0, $1, $2) { return $1 + Typograf._repeat(lquote, $2.length); })
            // Closing quote
            .replace(reR, function($0, $1, $2) { return $1 + Typograf._repeat(rquote, $2.length); })
            // Tag and closing quote
            .replace(reClosingTag, '$1' + rquote);

        if (lquote !== lquote2 && (count % 2) === 0) {
            text = this._setInnerQuotes(text, settings);
        }

        if (settings.spacing) {
            text = this._setQuoteSpacing(text, settings);
        }

        return text;
    },
    _removeQuoteSpacing(text, settings) {
        for (let i = 0, len = settings.left.length; i < len; i++) {
            const lquote = settings.left[i];
            const rquote = settings.right[i];

            text = text
                .replace(new RegExp(lquote + '([ \u202F\u00A0])', 'g'), lquote)
                .replace(new RegExp('([ \u202F\u00A0])' + rquote, 'g'), rquote);
        }

        return text;
    },
    _setQuoteSpacing(text, settings) {
        for (let i = 0, len = settings.left.length; i < len; i++) {
            const lquote = settings.left[i];
            const rquote = settings.right[i];

            text = text
                .replace(new RegExp(lquote + '([^\u202F])', 'g'), lquote + '\u202F$1')
                .replace(new RegExp('([^\u202F])' + rquote, 'g'), '$1\u202F' + rquote);
        }

        return text;
    },
    _setInnerQuotes(text, settings) {
        const leftQuotes = [];
        const rightQuotes = [];

        for (let k = 0; k < settings.left.length; k++) {
            leftQuotes.push(settings.left[k]);
            rightQuotes.push(settings.right[k]);
        }

        const lquote = settings.left[0];
        const rquote = settings.right[0];
        const bufText = new Array(text.length);
        const minLevel = -1;
        const maxLevel = leftQuotes.length - 1;
        let level = minLevel;

        for (let i = 0, len = text.length; i < len; i++) {
            let letter = text[i];

            if (letter === lquote) {
                level++;
                if (level > maxLevel) {
                    level = maxLevel;
                }
                bufText.push(leftQuotes[level]);
            } else if (letter === rquote) {
                if (level <= minLevel) {
                    level = 0;
                    bufText.push(leftQuotes[level]);
                } else {
                    bufText.push(rightQuotes[level]);
                    level--;
                    if (level < minLevel) {
                        level = minLevel;
                    }
                }
            } else {
                if (letter === '"') {
                    level = minLevel;
                }

                bufText.push(letter);
            }
        }

        return bufText.join('');
    }
});
