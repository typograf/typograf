import Typograf from './typograf';

export default class SafeTags {
    constructor() {
        const html = [
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

    /**
     * Add own safe tag.
     *
     * @param {RegExp|string[]} tag
     */
    add(tag) {
        this._tags.own.push(this._prepareRegExp(tag));
    }

    /**
     * Show safe tags.
     *
     * @param {Object} context
     * @param {Function} callback
     */
    show(context, callback) {
        const label = Typograf._privateLabel;
        const reReplace = new RegExp(label + 'tf\\d+' + label, 'g');
        const reSearch = new RegExp(label + 'tf\\d');
        const replaceLabel = function(match) {
            return context.safeTags.hidden[context.safeTags.group][match] || match;
        };

        this._reservedGroups.forEach(function(group) {
            context.safeTags.group = group;

            for (let i = 0, len = this._tags[group].length; i < len; i++) {
                context.text = context.text.replace(reReplace, replaceLabel);
                if (context.text.search(reSearch) === -1) { break; }
            }

            callback(context, group);
        }, this);

        context.safeTags = null;
    }

    /**
     * Hide safe tags.
     *
     * @param {Object} context
     * @param {Function} callback
     */
    hide(context, callback) {
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
    }

    _hide(context, group) {
        function pasteLabel(match) {
            const key = Typograf._privateLabel + 'tf' + context.safeTags.i + Typograf._privateLabel;
            context.safeTags.hidden[context.safeTags.group][key] = match;
            context.safeTags.i++;

            return key;
        }

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
    }

    _prepareRegExp(tag) {
        let re;

        if (tag instanceof RegExp) {
            re = tag;
        } else {
            let [startTag, endTag, middle] = tag;
            if (typeof middle === 'undefined') {
                middle = '[^]*?';
            }

            re = new RegExp(startTag + middle + endTag, 'gi');
        }

        return re;
    }
}
