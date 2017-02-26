Typograf.addRule({
    name: 'common/punctuation/quote',
    handler: function(text, commonSettings) {
        var locale = this._locale[0],
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

Typograf.prototype._setQuotes = function(text, settings) {
    var privateLabel = Typograf._privateLabel,
        lquote = settings.left[0],
        rquote = settings.right[0],
        lquote2 = settings.left[1] || lquote,
        quotes = '[' + Typograf.getData('common/quote') + ']',
        reL = new RegExp('(^|[\\s[(])("{1,3})(?=\\S)', 'gim'),
        reR = new RegExp('(\\S)("{1,3})(?=[!?.:;#*,…)\\s' + privateLabel + ']|$)', 'gim'),
        reQuotes = new RegExp(quotes, 'g'),
        reClosingTag = new RegExp('(' + privateLabel + ')"(?=[^\\s' + privateLabel + ']|$)', 'gm'),
        count = 0;

    text = text
        // Hide incorrect quotes.
        .replace(reQuotes, function() {
            count++;
            return '"';
        })
        // Opening quote
        .replace(reL, function($0, $1, $2) { return $1 + Typograf._repeat(lquote, $2.length); })
        // Closing quote
        .replace(reR, function($0, $1, $2) { return $1 + Typograf._repeat(rquote, $2.length); })
        // Tag and closing quote
        .replace(reClosingTag, '$1' + rquote);

    if (lquote !== lquote2 && (count % 2) === 0) {
        text = this._setInnerQuotes(text, settings);
    }

    return text;
};

Typograf.prototype._setInnerQuotes = function(text, settings) {
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
};
