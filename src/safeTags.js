import inlineElements from './htmlTags/inline';
import { regExpUrl } from './helpers/regExp';
import { privateLabel } from './consts';

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
            url: [ regExpUrl ]
        };

        this._groups = ['own', 'html', 'url'];
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
     * @param {string} group
     */
    show(context, group) {
        const reReplace = new RegExp(privateLabel + 'tf\\d+' + privateLabel, 'g');
        const reSearch = new RegExp(privateLabel + 'tf\\d');
        const replaceLabel = function(match) {
            return context.safeTags.hidden[group][match] || match;
        };

        for (let i = 0, len = this._tags[group].length; i < len; i++) {
            context.text = context.text.replace(reReplace, replaceLabel);
            if (context.text.search(reSearch) === -1) { break; }
        }
    }

    /**
     * Hide safe tags.
     *
     * @param {Object} context
     * @param {string} group
     */
    hide(context, group) {
        context.safeTags = context.safeTags || { hidden: {}, i: 0 };
        context.safeTags.hidden[group] = {};

        const pasteLabel = this._pasteLabel.bind(this, context, group);
        this._tags[group].forEach(function(tag) {
            context.text = context.text.replace(this._prepareRegExp(tag), pasteLabel);
        }, this);
    }

    /**
     * Hide HTML tags.
     *
     * @param {Object} context
     */
    hideHTMLTags(context) {
        if (context.isHTML) {
            const pasteLabel = this._pasteLabel.bind(this, context, 'html');
            context.text = context.text
                .replace(/<\/?[a-z][^]*?>/gi, pasteLabel) // Tags
                .replace(/&lt;\/?[a-z][^]*?&gt;/gi, pasteLabel) // Escaping tags
                .replace(/&[gl]t;/gi, pasteLabel);
        }
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
            if (text[i] === privateLabel) {
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
            if (text[i] === privateLabel) {
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

    _pasteLabel(context, group, match) {
        const safeTags = context.safeTags;
        const key = privateLabel + 'tf' + safeTags.i + privateLabel;
        safeTags.hidden[group][key] = match;
        safeTags.i++;

        return key;
    }

    _prepareRegExp(tag) {
        let re;

        if (tag instanceof RegExp) {
            re = tag;
        } else {
            const startTag = tag[0];
            const endTag = tag[1];
            let middle = tag[2];
            if (typeof middle === 'undefined') {
                middle = '[^]*?';
            }

            re = new RegExp(startTag + middle + endTag, 'gi');
        }

        return re;
    }
}
