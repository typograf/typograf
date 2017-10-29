import Typograf from './typograf';
import inlineElements from './inline-elements';

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
            url: [ Typograf._reUrl ]
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

    /**
     * Get previous label.
     *
     * @param {string} text
     * @param {number} position
     *
     * @returns {string|false}
     */
    getPrevLabel(text, position) {
        for (let i = position - 1; i >= 0; i--) {
            if (text[i] === Typograf._privateLabel) {
                return text.slice(i, position + 1);
            }
        }

        return false;
    }

    /**
     * Get next label.
     *
     * @param {string} text
     * @param {number} position
     *
     * @returns {string|false}
     */
    getNextLabel(text, position) {
        for (let i = position + 1; i < text.length; i++) {
            if (text[i] === Typograf._privateLabel) {
                return text.slice(position, i + 1);
            }
        }

        return false;
    }

    /**
     * Get a tag by a label.
     *
     * @param {Object} context
     * @param {string} label
     *
     * @returns {Object|boolean}
     */
    getTagByLabel(context, label) {
        let result = false;
        this._groups.some(function(group) {
            const value = context.safeTags.hidden[group][label];
            if (typeof value !== 'undefined') {
                result = {
                    group,
                    value
                };
            }

            return result;
        });

        return result;
    }

    /**
     * Get info about a tag.
     *
     * @param {Object|undefined} tag
     *
     * @returns {Object|undefined}
     */
    getTagInfo(tag) {
        if (!tag) {
            return;
        }

        const result = { group: tag.group };

        switch (tag.group) {
            case 'html':
                result.name = tag.value.split(/[<\s>]/)[1];
                result.isInline = inlineElements.indexOf(result.name) > -1;
                result.isClosing = tag.value.search(/^<\//) > -1;
                break;
            case 'url':
                result.isInline = true;
                break;
            case 'own':
                result.isInline = false;
                break;
        }

        return result;
    }

    _hide(context, group) {
        function pasteLabel(match) {
            const safeTags = context.safeTags;
            const key = Typograf._privateLabel + 'tf' + safeTags.i + Typograf._privateLabel;
            safeTags.hidden[context.safeTags.group][key] = match;
            safeTags.i++;

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
