import { inlineElements } from './htmlTags/inline';
import { regExpUrl } from './helpers/regExp';
import { privateLabel } from './consts';
import { TypografContext } from './main';

interface Tag {
    group: string;
    value: string;
}

interface TagInfo {
    group: string;
    name?: string;
    isInline?: boolean;
    isClosing?: boolean;
}

export class SafeTags {
    private groups = ['own', 'html', 'url'];
    private tags: Record<string, RegExp[]>;
    private hidden: Record<string, Record<string, string>> = {};
    private counter = 0;

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
        ].forEach(tag => {
            html.push([
                `<${tag}(\\s[^>]*?)?>`,
                `</${tag}>`
            ]);
        });

        this.tags = {
            own: [],
            html: html.map(this.prepareRegExp),
            url: [ regExpUrl ]
        };
    }

    /**
     * Add own safe tag.
     */
    public add(tag: RegExp | string[]): void {
        this.tags.own.push(this.prepareRegExp(tag));
    }

    /**
     * Show safe tags.
     */
    public show(context: TypografContext, group: string): void {
        const reReplace = new RegExp(privateLabel + 'tf\\d+' + privateLabel, 'g');
        const reSearch = new RegExp(privateLabel + 'tf\\d');
        const replaceLabel = (match: string) => {
            return context.safeTags.hidden[group][match] || match;
        };

        for (let i = 0, len = this.tags[group].length; i < len; i++) {
            context.text = context.text.replace(reReplace, replaceLabel);
            if (context.text.search(reSearch) === -1) { break; }
        }
    }

    /**
     * Hide safe tags.
     */
    public hide(context: TypografContext, group: string): void {
        context.safeTags.hidden[group] = {};

        const pasteLabel = this.pasteLabel.bind(this, context, group);
        this.tags[group].forEach((tag) => {
            context.text = context.text.replace(this.prepareRegExp(tag), pasteLabel);
        });
    }

    /**
     * Hide HTML tags.
     */
    public hideHTMLTags(context: TypografContext): void {
        if (context.isHTML) {
            const pasteLabel = this.pasteLabel.bind(this, context, 'html');
            context.text = context.text
                .replace(/<\/?[a-z][^]*?>/gi, pasteLabel) // Tags
                .replace(/&lt;\/?[a-z][^]*?&gt;/gi, pasteLabel) // Escaping tags
                .replace(/&[gl]t;/gi, pasteLabel);
        }
    }

    /**
     * Get previous label.
     */
    public getPrevLabel(text: string, position: number): string {
        for (let i = position - 1; i >= 0; i--) {
            if (text[i] === privateLabel) {
                return text.slice(i, position + 1);
            }
        }

        return '';
    }

    private getNextLabel(text: string, position: number): string {
        for (let i = position + 1; i < text.length; i++) {
            if (text[i] === privateLabel) {
                return text.slice(position, i + 1);
            }
        }

        return '';
    }

    private getTagByLabel(context: TypografContext, label: string): Tag | null {
        let result: Tag | null = null;
        this.groups.some(group => {
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

    private getTagInfo(tag: Tag | null): TagInfo | null {
        if (!tag) {
            return null;
        }

        const result: TagInfo = { group: tag.group };

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

    private pasteLabel(context: TypografContext, group: string, match: string) {
        const { safeTags } = context;
        const key = privateLabel + 'tf' + safeTags.counter + privateLabel;

        safeTags.hidden[group][key] = match;
        safeTags.counter++;

        return key;
    }

    private prepareRegExp(tag: RegExp | string[]): RegExp {
        if (tag instanceof RegExp) {
            return tag;
        }

        const [startTag, endTag, middle] = tag;

        return new RegExp(
            startTag +
            (typeof middle === 'undefined' ? '[^]*?' : middle) +
            endTag,
            'gi'
        );
    }

    public getPrevTagInfo(context: TypografContext, text: string, pos: number): TagInfo | null {
        const prevLabel = this.getPrevLabel(text, pos - 1);
        if (prevLabel) {
            const prevTag = this.getTagByLabel(context, prevLabel);
            if (prevTag) {
                return this.getTagInfo(prevTag);
            }
        }

        return null;
    }

    public getNextTagInfo(context: TypografContext, text: string, pos: number): TagInfo | null {
        const nextLabel = this.getNextLabel(text, pos + 1);
        if (nextLabel) {
            const nextTag = this.getTagByLabel(context, nextLabel);
            if (nextTag) {
                return this.getTagInfo(nextTag);
            }
        }

        return null;
    }
}
