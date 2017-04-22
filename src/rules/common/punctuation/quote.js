Typograf.addRule({
    name: 'common/punctuation/quote',
    handler: function(text, commonSettings, context) {
        var locale = context.prefs.locale[0],
            localeSettings = commonSettings[locale];

        if (!localeSettings) { return text; }

        var lquote = localeSettings.left[0],
            rquote = localeSettings.right[0],
            lquote2 = localeSettings.left[1] || lquote;

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
    settings: function() {
        var settings = {};

        Typograf.getLocales().forEach(function(locale) {
            settings[locale] = Typograf.deepCopy(Typograf.getData(locale + '/quote'));
        });

        return settings;
    }
});

Typograf._mix(Typograf.prototype, {
    _setQuotes: function(text, settings) {
        var privateLabel = Typograf._privateLabel,
            lquote = settings.left[0],
            rquote = settings.right[0],
            lquote2 = settings.left[1] || lquote,
            quotes = '[' + Typograf.getData('common/quote') + ']',
            reL = new RegExp('(^|[ \\t\\n\u00A0[(])("{1,3})(?=[^ \\t\\n\u00A0])', 'gim'),
            reR = new RegExp('([^ \\t\\n\u00A0])("{1,3})(?=[!?.:;#*,…)\\s' + privateLabel + ']|$)', 'gim'),
            reQuotes = new RegExp(quotes, 'g'),
            reClosingTag = new RegExp('(' + privateLabel + ')"(?=[^ \\t\\n' + privateLabel + ']|$)', 'gm'),
            count = 0;

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
    _removeQuoteSpacing: function(text, settings) {
        for (var i = 0, len = settings.left.length; i < len; i++) {
            var lquote = settings.left[i];
            var rquote = settings.right[i];

            text = text
                .replace(new RegExp(lquote + '([ \u202F\u00A0])', 'g'), lquote)
                .replace(new RegExp('([ \u202F\u00A0])' + rquote, 'g'), rquote);
        }

        return text;
    },
    _setQuoteSpacing: function(text, settings) {
        for (var i = 0, len = settings.left.length; i < len; i++) {
            var lquote = settings.left[i];
            var rquote = settings.right[i];

            text = text
                .replace(new RegExp(lquote + '([^\u202F])', 'g'), lquote + '\u202F$1')
                .replace(new RegExp('([^\u202F])' + rquote, 'g'), '$1\u202F' + rquote);
        }

        return text;
    },
    _setInnerQuotes: function(text, settings) {
        var leftQuotes = [],
            rightQuotes = [];

        for (var k = 0; k < settings.left.length; k++) {
            leftQuotes.push(settings.left[k]);
            rightQuotes.push(settings.right[k]);
        }

        var lquote = settings.left[0],
            rquote = settings.right[0],
            bufText = new Array(text.length),
            minLevel = -1,
            maxLevel = leftQuotes.length - 1,
            level = minLevel;

        for (var i = 0, len = text.length; i < len; i++) {
            var letter = text[i];

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
