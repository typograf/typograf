function SafeTags() {
    var html = [
        ['<!--', '-->'],
        ['<!ENTITY', '>'],
        ['<!DOCTYPE', '>'],
        ['<\\?xml', '\\?>'],
        ['<!\\[CDATA\\[', '\\]\\]>']
    ];

    [
        'code',
        'kbd',
        'object',
        'pre',
        'samp',
        'script',
        'style',
        'var'
    ].forEach(function(tag) {
        html.push([
            '<' + tag + '(\\s[^>]*?)?>',
            '</' + tag + '>'
        ]);
    }, this);

    this._tags = {
        own: [],
        html: html.map(this._prepareRegExp),
        url: [Typograf._reUrl]
    };

    this._pasteLabel = this._pasteLabel.bind(this);
    this._replaceLabel = this._replaceLabel.bind(this);

    this._groups = ['own', 'html', 'url'];
    this._reservedGroups = [].concat(this._groups).reverse();
}

SafeTags.prototype = {
    constructor: SafeTags,
    /**
     * Add own safe tag.
     *
     * @param {RegExp|string[]} tag
     */
    add: function(tag) {
        this._tags.own.push(this._prepareRegExp(tag));
    },
    /**
     * Show safe tags.
     *
     * @param {string} text
     * @param {Function} callback
     * @return {string}
     */
    show: function(text, callback) {
        var label = Typograf._privateLabel,
            reReplace = new RegExp(label + 'tf\\d+' + label, 'g'),
            reSearch = new RegExp(label + 'tf\\d');

        this._reservedGroups.forEach(function(group) {
            this._currentGroup = group;

            for (var i = 0, len = this._tags[group].length; i < len; i++) {
                text = text.replace(reReplace, this._replaceLabel);
                if (text.search(reSearch) === -1) { break; }
            }

            text = callback(text, group);
        }, this);

        this._hiddenTags = null;

        return text;
    },
    /**
     * Hide safe tags.
     *
     * @param {string} text
     * @param {boolean} isHTML
     * @param {Function} callback
     * @return {string}
     */
    hide: function(text, isHTML, callback) {
        this._isHTML = isHTML;

        this._hiddenTags = {};
        this._groups.forEach(function(group) {
            this._hiddenTags[group] = {};
        }, this);
        this._iLabel = 0;

        this._groups.forEach(function(group) {
            text = this._hide(text, group);
            text = callback(text, group);
        }, this);

        return text;
    },
    _hide: function(text, group) {
        this._currentGroup = group;

        this._tags[group].forEach(function(tag) {
            text = text.replace(this._prepareRegExp(tag), this._pasteLabel);
        }, this);

        if (group === 'html' && this._isHTML) {
            text = text
                .replace(/<\/?[a-z][^]*?>/gi, this._pasteLabel) // Tags
                .replace(/&lt;\/?[a-z][^]*?&gt;/gi, this._pasteLabel) // Escaping tags
                .replace(/&[gl]t;/gi, this._pasteLabel);
        }

        return text;
    },
    _prepareRegExp: function(tag) {
        var re;

        if (tag instanceof RegExp) {
            re = tag;
        } else {
            var startTag = tag[0],
                endTag = tag[1],
                middle = typeof tag[2] === 'undefined' ? '[^]*?' : tag[2];

            re = new RegExp(startTag + middle + endTag, 'gi');
        }

        return re;
    },
    _getPrivateLabel: function(i) {
        var label = Typograf._privateLabel;
        return label + 'tf' + i + label;
    },
    _pasteLabel: function(match) {
        var key = this._getPrivateLabel(this._iLabel);
        this._hiddenTags[this._currentGroup][key] = match;
        this._iLabel++;

        return key;
    },
    _replaceLabel: function(match) {
        return this._hiddenTags[this._currentGroup][match] || match;
    }
};
