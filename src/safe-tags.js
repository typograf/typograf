import Typograf from './typograf';

export default function SafeTags() {
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
     * @param {Object} context
     * @param {Function} callback
     */
    show: function(context, callback) {
        var label = Typograf._privateLabel,
            reReplace = new RegExp(label + 'tf\\d+' + label, 'g'),
            reSearch = new RegExp(label + 'tf\\d'),
            replaceLabel = function(match) {
                return context.safeTags.hidden[context.safeTags.group][match] || match;
            };

        this._reservedGroups.forEach(function(group) {
            context.safeTags.group = group;

            for (var i = 0, len = this._tags[group].length; i < len; i++) {
                context.text = context.text.replace(reReplace, replaceLabel);
                if (context.text.search(reSearch) === -1) { break; }
            }

            callback(context, group);
        }, this);

        context.safeTags = null;
    },
    /**
     * Hide safe tags.
     *
     * @param {Object} context
     * @param {Function} callback
     */
    hide: function(context, callback) {
        context.safeTags = {
            hidden: {},
            i: 0
        };
        
        this._groups.forEach(function(group) {
            context.safeTags.hidden[group] = {};
        }, this);

        this._groups.forEach(function(group) {
            this._hide(context, group);
            callback(context, group);
        }, this);
    },
    _hide: function(context, group) {
        var pasteLabel = function(match) {
            var key = Typograf._privateLabel + 'tf' + context.safeTags.i + Typograf._privateLabel;
            context.safeTags.hidden[context.safeTags.group][key] = match;
            context.safeTags.i++;

            return key;
        };

        context.safeTags.group = group;

        this._tags[group].forEach(function(tag) {
            context.text = context.text.replace(this._prepareRegExp(tag), pasteLabel);
        }, this);

        if (group === 'html' && context.isHTML) {
            context.text = context.text
                .replace(/<\/?[a-z][^]*?>/gi, pasteLabel) // Tags
                .replace(/&lt;\/?[a-z][^]*?&gt;/gi, pasteLabel) // Escaping tags
                .replace(/&[gl]t;/gi, pasteLabel);
        }
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
    }
};
