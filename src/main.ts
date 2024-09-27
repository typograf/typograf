import { htmlEntities, TypografHtmlEntityType } from './htmlEntities/index';
import { addLocale, hasLocale, getLocales, checkLocales } from './locale';
import { getData, setData } from './data';
import { SafeTags } from './safeTags';
import { replaceNbsp, isHTML, removeCR, fixLineEnding } from './helpers/string';
import { deepCopy } from './helpers/object';
import { privateSeparateLabel } from './consts';
import { addInnerRule, addRule, getInnerRules, getRules, DEFAULT_QUEUE_NAME } from './rule';
import { PACKAGE_VERSION } from './version';
import { prepareContextPrefs, preparePrefs } from './prefs';

export type TypografLineEnding = 'LF' | 'CR' | 'CRLF';

export interface TypografHtmlEntity {
    type: TypografHtmlEntityType;
    onlyInvisible: boolean;
    list?: string[];
}

export type TypografRuleFilter = (rule: TypografRuleInternal) => boolean;

export interface TypografPrefs {
    locale: string | string[];
    lineEnding?: TypografLineEnding;
    htmlEntity?: Partial<TypografHtmlEntity>;
    live?: boolean;
    enableRule?: string | string[];
    disableRule?: string | string[];
    processingSeparateParts?: boolean;
    ruleFilter?: TypografRuleFilter;
}

export interface TypografExecutePrefs {
    locale?: string | string[];
    lineEnding?: TypografLineEnding;
    htmlEntity?: Partial<TypografHtmlEntity>;
    processingSeparateParts?: boolean;
    ruleFilter?: TypografRuleFilter;
}

export interface TypografPrefsInternal {
    locale: string[];
    lineEnding: TypografLineEnding;
    htmlEntity: TypografHtmlEntity;
    live: boolean;
    enableRule: string | string[];
    disableRule: string | string[];
    processingSeparateParts: boolean;
    ruleFilter: TypografRuleFilter;
}

export interface TypografContext {
    text: string;
    isHTML: boolean;
    prefs: TypografPrefsInternal;
    safeTags: SafeTags;
    getData: (key: string) => unknown;
}

export interface TypografRule<T = Record<string, unknown>> {
    name: string;
    handler: (this: Typograf, text: string, settings: T, context: TypografContext) => string;
    queue?: string;
    index?: string | number;
    disabled?: boolean;
    live?: boolean;
    settings?: T;
    htmlAttrs?: boolean;
}

export interface TypografRuleInternal {
    name: string;
    handler: (text: string, settings: unknown, context: TypografContext) => string;
    shortName: string;
    locale: string;
    group: string;
    queue: string;
    index: number;
    enabled: boolean;
    live: boolean;
    settings: unknown;
    htmlAttrs: boolean;
}

export class Typograf {
    public safeTags: SafeTags;
    public onBeforeRule?: (ruleName: string, context: TypografContext) => void;
    public onAfterRule?: (ruleName: string, context: TypografContext) => void;

    private prefs: TypografPrefsInternal;
    private rules: TypografRuleInternal[] = [];
    private innerRules: TypografRuleInternal[] = [];
    private rulesByQueues: Record<string, TypografRuleInternal[]> = {};
    private innerRulesByQueues: Record<string, TypografRuleInternal[]> = {};
    private enabledRules: Record<string, boolean>;
    private settings: Record<string, Record<string, unknown>>;

    private separatePartsTags = [
        'title',
        'p',
        'h[1-6]',
        'select',
        'legend',
    ];

    constructor(prefs: TypografPrefs) {
        this.prefs = preparePrefs(prefs);
        checkLocales(this.prefs.locale);

        this.safeTags = new SafeTags();

        this.settings = {};
        this.enabledRules = {};

        this.innerRulesByQueues = {};
        this.innerRules = getInnerRules();
        this.innerRules.forEach(rule => {
            this.innerRulesByQueues[rule.queue] = this.innerRulesByQueues[rule.queue] || [];
            this.innerRulesByQueues[rule.queue].push(rule);
        });

        this.rulesByQueues = {};
        this.rules = getRules();

        this.rules.forEach(rule => {
            this.prepareRuleSettings(rule);
            this.rulesByQueues[rule.queue] = this.rulesByQueues[rule.queue] || [];
            this.rulesByQueues[rule.queue].push(rule);
        });

        if (this.prefs.disableRule) {
            this.disableRule(this.prefs.disableRule);
        }

        if (this.prefs.enableRule) {
            this.enableRule(this.prefs.enableRule);
        }
    }

    static addRule(rule: TypografRule): void {
        addRule(rule);
    }

    static addRules(rules: TypografRule[]): void {
        rules.forEach((item) => {
            this.addRule(item);
        });
    }

    /**
     * Add internal rule.
     * Internal rules are executed before main rules.
     */
    static addInnerRule(rule: TypografRule): void {
        addInnerRule(rule);
    }

    static addInnerRules(rules: TypografRule[]): void{
        rules.forEach((item) => {
            this.addInnerRule(item);
        });
    }

    static getRule(ruleName: string): TypografRuleInternal | null {
        let rule = null;
        const rules = getRules();

        rules.some(item => {
            if (item.name === ruleName) {
                rule = item;
                return true;
            }

            return false;
        });

        return rule;
    }

    static getRules(): TypografRuleInternal[] {
        return getRules();
    }

    static getInnerRules(): TypografRuleInternal[] {
        return getInnerRules();
    }

    static getLocales(): string[] {
        return getLocales();
    }

    static addLocale(locale: string): void {
        addLocale(locale);
    }

    static hasLocale(locale: string): boolean {
        return hasLocale(locale);
    }

    static setData(data: Record<string, unknown>): void {
        setData(data);
    }

    static getData(key: string): unknown {
        return getData(key);
    }

    static groups: { name: string; title: Record<string, string>}[] = [];
    static titles: Record<string, Record<string, string>> = {};
    static version = PACKAGE_VERSION;

    /**
     * Execute typographical rules for text.
     */
    public execute(text: string | number, prefs?: TypografExecutePrefs): string {
        text = '' + text;

        if (!text) { return ''; }

        const contextPrefs = prepareContextPrefs(this.prefs, prefs);
        checkLocales(contextPrefs.locale);

        const context = this.prepareContext(text, contextPrefs);

        return this.process(context);
    }

    public getSetting(ruleName: string, setting: string): unknown {
        return this.settings[ruleName] && this.settings[ruleName][setting];
    }

    public setSetting(ruleName: string, setting: string, value: unknown): void {
        this.settings[ruleName] = this.settings[ruleName] || {};
        this.settings[ruleName][setting] = value;
    }

    public isEnabledRule(ruleName: string): boolean {
        return this.enabledRules[ruleName] !== false;
    }

    public isDisabledRule(ruleName: string): boolean {
        return !this.enabledRules[ruleName];
    }

    public enableRule(ruleName: string | string[]): void {
        return this.enable(ruleName, true);
    }

    public disableRule(ruleName: string | string[]): void {
        return this.enable(ruleName, false);
    }

    /**
     * Add safe tag.
     *
     * @example
     * // const typograf = new Typograf({ locale: 'ru' });
     * // typograf.addSafeTag('<mytag>', '</mytag>');
     * // typograf.addSafeTag('<mytag>', '</mytag>', '.*?');
     * // typograf.addSafeTag(/<mytag>.*?</mytag>/gi);
    */
    public addSafeTag(startTag: string | RegExp, endTag?: string, middle?: string): void {
        const tag = startTag instanceof RegExp ? startTag : [startTag, endTag, middle];

        this.safeTags.add(tag);
    }

    private prepareContext(text: string, prefs: TypografPrefsInternal) {
        const context: TypografContext = {
            text,
            isHTML: isHTML(text),
            prefs,
            getData: (key: string) => {
                if (key === 'char') {
                    return prefs.locale.map(item => {
                        return getData(item + '/' + key);
                    }).join('');
                } else {
                    return getData(prefs.locale[0] + '/' + key);
                }
            },
            safeTags: this.safeTags,
        };

        return context;
    }

    private splitBySeparateParts(context: TypografContext) {
        if (!context.isHTML || context.prefs.processingSeparateParts === false) {
            return [ context.text ];
        }

        const text = [];
        const reTags = new RegExp('<(' + this.separatePartsTags.join('|') + ')(\\s[^>]*?)?>[^]*?</\\1>', 'gi');

        let position = 0;

        context.text.replace(reTags, function($0, $1, $2, itemPosition) {
            if (position !== itemPosition) {
                text.push(
                    (position ? privateSeparateLabel : '') +
                    context.text.slice(position, itemPosition) +
                    privateSeparateLabel
                );
            }

            text.push($0);

            position = itemPosition + $0.length;

            return $0;
        });

        text.push(position ?
            (privateSeparateLabel + context.text.slice(position, context.text.length)) :
            context.text
        );

        return text;
    }

    private process(context: TypografContext) {
        context.text = removeCR(context.text);

        this.executeRules(context, 'start');

        this.safeTags.hide(context, 'own');
        this.executeRules(context, 'hide-safe-tags-own');

        this.safeTags.hide(context, 'html');
        this.executeRules(context, 'hide-safe-tags-html');

        const isRootHTML = context.isHTML;
        const re = new RegExp(privateSeparateLabel, 'g');

        context.text = this.splitBySeparateParts(context).map((item) => {
            context.text = item;
            context.isHTML = isHTML(item);

            this.safeTags.hideHTMLTags(context);

            this.safeTags.hide(context, 'url');
            this.executeRules(context, 'hide-safe-tags-url');

            this.executeRules(context, 'hide-safe-tags');

            htmlEntities.toUtf(context);

            if (context.prefs.live) {
                context.text = replaceNbsp(context.text);
            }

            this.executeRules(context, 'utf');

            this.executeRules(context);

            htmlEntities.restore(context);

            this.executeRules(context, 'html-entities');

            this.safeTags.show(context, 'url');
            this.executeRules(context, 'show-safe-tags-url');

            return context.text.replace(re, '');
        }).join('');

        context.isHTML = isRootHTML;

        this.safeTags.show(context, 'html');
        this.executeRules(context, 'show-safe-tags-html');

        this.safeTags.show(context, 'own');
        this.executeRules(context, 'show-safe-tags-own');

        this.executeRules(context, 'end');

        return fixLineEnding(context.text, context.prefs.lineEnding);
    }

    private executeRules(context: TypografContext, queue = DEFAULT_QUEUE_NAME) {
        const rules = this.rulesByQueues[queue];
        const innerRules = this.innerRulesByQueues[queue];

        if (innerRules) {
            innerRules.forEach(rule => {
                this.ruleIterator(context, rule);
            });
        }

        if (rules) {
            rules.forEach(rule => {
                this.ruleIterator(context, rule);
            });
        }
    }

    private ruleIterator(context: TypografContext, rule: TypografRuleInternal) {
        if ((context.prefs.live === true && rule.live === false) || (context.prefs.live === false && rule.live === true)) {
            return;
        }

        if ((rule.locale === 'common' || rule.locale === context.prefs.locale[0]) && this.isEnabledRule(rule.name)) {
            if (context.prefs.ruleFilter && !context.prefs.ruleFilter(rule)) {
                return;
            }

            if (this.onBeforeRule) {
                this.onBeforeRule(rule.name, context);
            }

            context.text = rule.handler.call(this, context.text, this.settings[rule.name], context);

            if (this.onAfterRule) {
                this.onAfterRule(rule.name, context);
            }
        }
    }

    private prepareRuleSettings(rule: TypografRuleInternal) {
        this.settings[rule.name] = deepCopy(rule.settings) as Record<string, unknown>;
        this.enabledRules[rule.name] = rule.enabled;
    }

    private enable(ruleName: string | string[], enabled: boolean) {
        if (Array.isArray(ruleName)) {
            ruleName.forEach(item => {
                this.enableByMask(item, enabled);
            });
        } else {
            this.enableByMask(ruleName, enabled);
        }
    }

    private enableByMask(ruleName: string, enabled: boolean) {
        if (!ruleName) { return; }

        if (ruleName.search(/\*/) !== -1) {
            const re = new RegExp(ruleName
                .replace(/\//g, '\\/')
                .replace(/\*/g, '.*'));

            this.rules.forEach(el => {
                const name = el.name;
                if (re.test(name)) {
                    this.enabledRules[name] = enabled;
                }
            });
        } else {
            this.enabledRules[ruleName] = enabled;
        }
    }
}
