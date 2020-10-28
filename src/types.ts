import Typograf from './typograf';
import SafeTags from './safeTags';

export type LineEnding = 'LF' | 'CRLF' | 'CR';
export type Mode = 'default' | 'digit' | 'name';
export type Queue = 'default' | 'start' | 'utf' | 'show-safe-tags-own' | 'show-safe-tags-url' | 'html-entities' | 'hide-safe-tags-url' | 'hide-safe-tags' | 'hide-safe-tags-own' | 'hide-safe-tags-html' | 'show-safe-tags-html' | 'end';

export interface HtmlEntity {
    type: Mode;
    onlyInvisible?: boolean;
    list?: string[];
}

export interface Context {
    text: string;
    isHTML: boolean;
    options: PreparedOptions;
    safeTags: SafeTags;
    getData: <T>(key: string) => T;
    getCharData: () => string;
}

export interface Options {
    locale?: string[];
    htmlEntity?: HtmlEntity;
    lineEnding?: LineEnding;
    live?: boolean;
    processingSeparateParts?: boolean;
    enableRule?: string | string[];
    disableRule?: string | string[];
    ruleFilter?: (rule: PreparedRule) => boolean;
}

export interface PreparedOptions extends Options {
    locale: string[];
    htmlEntity: HtmlEntity;
}

interface Callable {
    (): any;
}

export interface Rule<T = any, U = any> {
    name: string;
    handler: (
        this: Typograf,
        text: string,
        settings: T extends Callable ? U : T,
        context: Context
    ) => string;
    index?: number | string;
    queue?: Queue;
    disabled?: boolean;
    htmlAttrs?: boolean;
    live?: boolean;
    settings?: T;
}

export interface PreparedRule<T = any> extends Rule<T> {
    enabled: boolean;
    group: string;
    index: number;
    locale: string;
    queue: Queue;
    shortName: string;
}
